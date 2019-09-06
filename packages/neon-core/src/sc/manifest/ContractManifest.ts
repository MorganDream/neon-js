import { ContractGroup, ContractGroupLike } from "./ContractGroup";
import { ContractAbi, ContractAbiLike } from "./ContractAbi";
import {
  ContractPermission,
  ContractPermissionLike
} from "./ContractPermission";
import { WildCardContainer } from "./WildCardContainer";

export interface ContractManifestLike {
  groups: ContractGroupLike[];
  abi: ContractAbiLike;
  permissions: ContractPermissionLike[];
  trusts: "*" | string[];
  safeMethods: "*" | string[];
  features: {
    storage: boolean;
    payable: boolean;
  };
}

export class ContractManifest {
  public static readonly MAX_LENGTH = 2048;
  public hash: string;
  public groups: ContractGroup[];
  public abi: ContractAbi;
  public permissions: ContractPermission[];
  public trusts: WildCardContainer;
  public safeMethods: WildCardContainer;
  public hasStorage: boolean;
  public payable: boolean;

  public constructor(obj: Partial<ContractManifestLike>) {
    const {
      groups = [],
      features: { storage = false, payable = false } = {},
      abi = {},
      permissions = [],
      trusts = "*",
      safeMethods = "*"
    } = obj;
    this.groups = groups.map(group => new ContractGroup(group));
    this.hasStorage = storage;
    this.payable = payable;
    this.abi = new ContractAbi(abi);
    this.permissions = permissions.map(
      permission => new ContractPermission(permission)
    );
    this.trusts = WildCardContainer.fromSerialized(trusts);
    this.safeMethods = WildCardContainer.fromSerialized(safeMethods);
    this.hash = this.abi.hash;
  }

  public canCall(manifest: ContractManifest, method: string): boolean {
    return this.permissions.some(permission => {
      const { contract, methods } = permission;
      if (contract.isHash) {
        if (contract.hash! !== manifest.hash) {
          return false;
        }
      } else if (contract.isGroup) {
        if (manifest.groups.every(group => group.pubKey !== contract.group)) {
          return false;
        }
      }
      return methods.isWildcard || methods.export().includes(method);
    });
  }

  public static parse(json: string): ContractManifest {
    return new ContractManifest(JSON.parse(json));
  }

  public export(): ContractManifestLike {
    return {
      groups: this.groups.map(group => group.export()),
      features: {
        storage: this.hasStorage,
        payable: this.payable
      },
      abi: this.abi.export(),
      permissions: this.permissions.map(permission => permission.export()),
      trusts: this.trusts.export(),
      safeMethods: this.safeMethods.export()
    };
  }

  // TODO
  public isValid(): boolean {
    return true;
  }
}
