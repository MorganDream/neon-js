/* eslint-disable @typescript-eslint/no-explicit-any */
import BN from "bn.js";
import {
  ensureHex,
  num2hexstring,
  reverseHex,
  str2hexstring,
  StringStream,
  Fixed8
} from "../u";
import ContractParam, {
  ContractParamType,
  likeContractParam
} from "./ContractParam";
import OpCode from "./OpCode";
import InteropServiceCode from "./InteropServiceCode";
import { ASSET_ID } from "../consts";

export interface ScriptIntent {
  scriptHash: string | "NEO" | "GAS" | "POLICY";
  operation?: string;
  args?: any[];
}

export interface ScriptResult {
  hex: string;
  fee: Fixed8;
}

function isValidValue(value: any): boolean {
  if (value) {
    return true;
  } else if (value === 0) {
    return true;
  } else if (value === "") {
    return true;
  }
  return false;
}

/**
 * Builds a VM script in hexstring. Used for constructing smart contract method calls.
 * @extends StringStream
 */
export class ScriptBuilder extends StringStream {
  /**
   * Appends an Opcode, followed by args
   */
  public emit(op: OpCode, args?: string): this {
    this.str += op;
    if (args) {
      this.str += args;
    }
    return this;
  }

  private _emitContractOperation(operation: string): this {
    let hexOp = "";
    for (let i = 0; i < operation.length; i++) {
      hexOp += num2hexstring(operation.charCodeAt(i));
    }
    return this.emitPush(hexOp);
  }

  public emitAppCall(
    scriptHash: string,
    operation?: string,
    args?: any[]
  ): this {
    this.emitPush(args || []);
    if (operation) {
      this._emitContractOperation(operation);
    }

    if (scriptHash.toUpperCase() === "NEO") {
      scriptHash = ASSET_ID.NEO;
    } else if (scriptHash.toUpperCase() === "GAS") {
      scriptHash = ASSET_ID.GAS;
    } else if (scriptHash.toUpperCase() === "POLICY") {
      scriptHash = ASSET_ID.POLICY;
    }
    ensureHex(scriptHash);
    if (scriptHash.length !== 40) {
      throw new Error("ScriptHash should be 20 bytes long!");
    }

    this.emitPush(reverseHex(scriptHash));
    return this.emitSysCall(InteropServiceCode.SYSTEM_CONTRACT_CALL);
  }

  public emitSysCall(service: InteropServiceCode, ...args: any[]): this {
    for (let i = args.length - 1; i >= 0; i--) {
      this.emitPush(args[i]);
    }
    return this.emit(OpCode.SYSCALL, service);
  }

  /**
   * Appends data depending on type. Used to append params/array lengths.
   * @param data
   * @return this
   */
  public emitPush(data?: any): this {
    switch (typeof data) {
      case "boolean":
        return this.emit(data ? OpCode.PUSH1 : OpCode.PUSH0);
      case "string":
        return this._emitString(data as string);
      case "number":
        return this._emitNum(data as number);
      case "undefined":
        return this.emitPush(false);
      case "object":
        if (Array.isArray(data)) {
          return this._emitArray(data);
        } else if (likeContractParam(data)) {
          return this._emitParam(new ContractParam(data));
        } else if (data === null) {
          return this.emitPush(false);
        }
        throw new Error(`Unidentified object: ${data}`);
      default:
        throw new Error();
    }
  }

  /**
   * Private method to append an array
   * @private
   */
  private _emitArray(arr: any[]): this {
    for (let i = arr.length - 1; i >= 0; i--) {
      this.emitPush(arr[i]);
    }
    return this.emitPush(arr.length).emit(OpCode.PACK);
  }

  /**
   * Private method to append a hexstring.
   * @private
   * @param hexstring Hexstring(BE)
   * @return this
   */
  private _emitString(hexstring: string): this {
    ensureHex(hexstring);
    const size = hexstring.length / 2;
    if (size < 0x100) {
      this.emit(OpCode.PUSHDATA1);
      this.str += num2hexstring(size);
      this.str += hexstring;
    } else if (size < 0x10000) {
      this.emit(OpCode.PUSHDATA2);
      this.str += num2hexstring(size, 2, true);
      this.str += hexstring;
    } else {
      this.emit(OpCode.PUSHDATA4);
      this.str += num2hexstring(size, 4, true);
      this.str += hexstring;
    }
    return this;
  }

  /**
   * Private method to append a number.
   * @private
   * @param num
   * @return this
   */
  private _emitNum(num: number | string): this {
    const bn = new BN(num);
    if (bn.gten(-1) && bn.lten(16)) {
      return this.emit(
        num2hexstring(16/* PUSH0 */ + bn.toNumber()) as OpCode
      );
    }

    const size = bn.byteLength();
    // const msbSet = bn.testn(bn.byteLength() * 8 - 1);

    // const hex = bn
    //   .toTwos(bn.byteLength() * 8)
    //   .toString(16, bn.byteLength() * 2);
    // const paddedHex = !bn.isNeg() && msbSet ? "00" + hex : hex;

    if (size === 1) return this.emit(OpCode.PUSHINT8, bn.toString('hex', 2));
    if (size === 2) return this.emit(OpCode.PUSHINT16, reverseHex(bn.toString('hex', 4)));
    if (size <= 4) return this.emit(OpCode.PUSHINT32, reverseHex(bn.toString('hex', 8)));
    if (size <= 8) return this.emit(OpCode.PUSHINT64, reverseHex(bn.toString('hex', 16)));
    if (size <= 16) return this.emit(OpCode.PUSHINT128, reverseHex(bn.toString('hex', 32)));
    if (size <= 32) return this.emit(OpCode.PUSHINT256, reverseHex(bn.toString('hex', 64)));
    throw new RangeError();
  }

  /**
   * Private method to append a ContractParam
   * @private
   */
  private _emitParam(param: ContractParam): this {
    if (!param.type) {
      throw new Error("No type available!");
    }
    if (!isValidValue(param.value)) {
      throw new Error("Invalid value provided!");
    }
    switch (param.type) {
      case ContractParamType.String:
        return this._emitString(str2hexstring(param.value));
      case ContractParamType.Boolean:
        return this.emit(param.value ? OpCode.PUSH1 : OpCode.PUSH0);
      case ContractParamType.Integer:
        return this._emitNum(param.value);
      case ContractParamType.ByteArray:
        return this._emitString(param.value);
      case ContractParamType.Array:
        return this._emitArray(param.value);
      case ContractParamType.Hash160:
        return this._emitString(reverseHex(param.value));
      case ContractParamType.PublicKey:
        return this._emitString(str2hexstring(param.value));
      default:
        throw new Error(`Unaccounted ContractParamType!: ${param.type}`);
    }
  }
}

export default ScriptBuilder;
