import { num2VarInt, StringStream, fixed82num, ensureHex } from "../../u";
import {
  TransactionAttribute,
  Witness,
  toTxAttrUsage,
  TransactionAttributeLike
} from "../components";
import { TransactionLike } from "./Transaction";
import { getScriptHashFromAddress } from "../../wallet";
import TxAttrUsage from "../components/txAttrUsage";
import {
  OpCodePrices,
  OpCode,
  InteropServiceCode,
  getInteropServicePrice,
  ScriptBuilder
} from "../../sc";

export function deserializeArrayOf<T>(
  type: (ss: StringStream) => T,
  ss: StringStream
): T[] {
  const output = [];
  const len = ss.readVarInt();
  for (let i = 0; i < len; i++) {
    output.push(type(ss));
  }
  return output;
}

export function serializeArrayOf(prop: any[]): string {
  return num2VarInt(prop.length) + prop.map(p => p.serialize()).join("");
}

export function deserializeVersion(
  ss: StringStream,
  tx: Partial<TransactionLike> = {}
): Partial<TransactionLike> {
  const byte = ss.read();
  const version = parseInt(byte, 16);
  if (version !== 0) {
    throw new Error(`Transaction version should be 0 not ${version}`);
  }
  return Object.assign(tx, { version });
}

export function deserializeNonce(
  ss: StringStream,
  tx: Partial<TransactionLike> = {}
): Partial<TransactionLike> {
  const nonce = parseInt(ss.read(4), 16);
  return Object.assign(tx, { nonce });
}

export function deserializeSender(
  ss: StringStream,
  tx: Partial<TransactionLike> = {}
): Partial<TransactionLike> {
  return Object.assign(tx, { sender: ss.read(20) });
}

export function deserializeScript(
  ss: StringStream,
  tx: Partial<TransactionLike> = {}
): Partial<TransactionLike> {
  const script = ss.readVarBytes();
  if (script.length === 0) {
    throw new Error("Script should not be vacant.");
  }
  return Object.assign(tx, { script });
}

export function deserializeFee(
  ss: StringStream,
  tx: Partial<TransactionLike> = {}
): Partial<TransactionLike> {
  const systemFee = fixed82num(ss.read(8));
  const networkFee = fixed82num(ss.read(8));
  return Object.assign(tx, { systemFee, networkFee });
}

export function deserializeValidUntilBlock(
  ss: StringStream,
  tx: Partial<TransactionLike>
): Partial<TransactionLike> {
  const validUntilBlock = parseInt(ss.read(4), 16);
  return Object.assign(tx, { validUntilBlock });
}

export function getCosignersFromAttributes(
  attrs: TransactionAttribute[] | TransactionAttributeLike[]
): string[] {
  return attrs
    .filter(attr => toTxAttrUsage(attr.usage) === TxAttrUsage.Cosigner)
    .map(attr => attr.data);
}

export function deserializeAttributes(
  ss: StringStream,
  tx: Partial<TransactionLike>
): Partial<TransactionLike> {
  const attributes = deserializeArrayOf(
    TransactionAttribute.fromStream,
    ss
  ).map(i => i.export());
  const cosigners = getCosignersFromAttributes(attributes);
  if (
    !cosigners.every(
      cosigner =>
        cosigners.indexOf(cosigner) === cosigners.lastIndexOf(cosigner)
    )
  ) {
    throw new Error("Cosigner should not duplicate.");
  }
  return Object.assign(tx, { attributes });
}

export function deserializeWitnesses(
  ss: StringStream,
  tx: Partial<TransactionLike>
): Partial<TransactionLike> {
  const scripts = deserializeArrayOf(Witness.fromStream, ss).map(i =>
    i.export()
  );
  return Object.assign(tx, { scripts });
}

export function formatSender(sender: string | undefined): string {
  if (!sender) {
    return "";
  }
  if (sender.length === 42 && sender.startsWith("0x")) {
    const hex = sender.slice(2);
    ensureHex(hex);
    return hex;
  } else if (sender.length === 40) {
    ensureHex(sender);
    return sender;
  } else if (sender.length === 34) {
    return getScriptHashFromAddress(sender);
  } else {
    throw new Error(`Sender format error: ${sender}`);
  }
}

export function getCompressedSize(value: number): number {
  if (value < 0xfd) {
    return 1;
  } else if (value < 0xffff) {
    return 3;
  } else {
    return 5;
  }
}

export function getNetworkFeeForSig(): number {
  return (
    OpCodePrices[OpCode.PUSHBYTES64] +
    OpCodePrices[OpCode.PUSHBYTES33] +
    getInteropServicePrice(InteropServiceCode.NEO_CRYPTO_CHECKSIG)
  );
}

export function getSizeForSig(signer: string): number {
  return 66 + signer.length / 2;
}

export function getNetworkFeeForMultiSig(
  signingThreshold: number,
  pubkeysNum: number
): number {
  const sb = new ScriptBuilder();
  return (
    OpCodePrices[OpCode.PUSHBYTES64] * signingThreshold +
    OpCodePrices[sb.emitPush(signingThreshold).str.slice(0, 2) as OpCode] +
    OpCodePrices[OpCode.PUSHBYTES33] * pubkeysNum +
    OpCodePrices[sb.emitPush(pubkeysNum).str.slice(0, 2) as OpCode] +
    getInteropServicePrice(InteropServiceCode.NEO_CRYPTO_CHECKMULTISIG, {
      size: pubkeysNum
    })
  );
}

export function getSizeForMultiSig(
  signer: string,
  signingThreshold: number
): number {
  const size_env = 65 * signingThreshold;
  return getCompressedSize(size_env) + size_env + signer.length / 2;
}
