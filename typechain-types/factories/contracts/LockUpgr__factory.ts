/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { LockUpgr, LockUpgrInterface } from "../../contracts/LockUpgr";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "when",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_unlockTime",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061081d806100206000396000f3fe60806040526004361061003f5760003560e01c8063251c1aa3146100445780633ccfd60b1461006f5780638da5cb5b14610086578063fe4b84df146100b1575b600080fd5b34801561005057600080fd5b506100596100cd565b604051610066919061046f565b60405180910390f35b34801561007b57600080fd5b506100846100d3565b005b34801561009257600080fd5b5061009b61024c565b6040516100a891906104cb565b60405180910390f35b6100cb60048036038101906100c69190610517565b610272565b005b60015481565b600154421015610118576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161010f906105a1565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019f9061060d565b60405180910390fd5b7fbf2ed60bd5b5965d685680c01195c9514e4382e28e3a5a2d2d5244bf59411b9347426040516101d992919061062d565b60405180910390a1600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610249573d6000803e3d6000fd5b50565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060019054906101000a900460ff161590508080156102a35750600160008054906101000a900460ff1660ff16105b806102d057506102b230610433565b1580156102cf5750600160008054906101000a900460ff1660ff16145b5b61030f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610306906106c8565b60405180910390fd5b60016000806101000a81548160ff021916908360ff160217905550801561034c576001600060016101000a81548160ff0219169083151502179055505b81421061038e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103859061075a565b60405180910390fd5b8160018190555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550801561042f5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498600160405161042691906107cc565b60405180910390a15b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000819050919050565b61046981610456565b82525050565b60006020820190506104846000830184610460565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104b58261048a565b9050919050565b6104c5816104aa565b82525050565b60006020820190506104e060008301846104bc565b92915050565b600080fd5b6104f481610456565b81146104ff57600080fd5b50565b600081359050610511816104eb565b92915050565b60006020828403121561052d5761052c6104e6565b5b600061053b84828501610502565b91505092915050565b600082825260208201905092915050565b7f596f752063616e27742077697468647261772079657400000000000000000000600082015250565b600061058b601683610544565b915061059682610555565b602082019050919050565b600060208201905081810360008301526105ba8161057e565b9050919050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006105f7601483610544565b9150610602826105c1565b602082019050919050565b60006020820190508181036000830152610626816105ea565b9050919050565b60006040820190506106426000830185610460565b61064f6020830184610460565b9392505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b60006106b2602e83610544565b91506106bd82610656565b604082019050919050565b600060208201905081810360008301526106e1816106a5565b9050919050565b7f556e6c6f636b2074696d652073686f756c6420626520696e207468652066757460008201527f7572650000000000000000000000000000000000000000000000000000000000602082015250565b6000610744602383610544565b915061074f826106e8565b604082019050919050565b6000602082019050818103600083015261077381610737565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b60006107b66107b16107ac8461077a565b610791565b610784565b9050919050565b6107c68161079b565b82525050565b60006020820190506107e160008301846107bd565b9291505056fea26469706673582212209bb776c536167cb60517b1aeb86e90ca33cbe14065f5d58075db9bf0302e53fb64736f6c634300080d0033";

type LockUpgrConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LockUpgrConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LockUpgr__factory extends ContractFactory {
  constructor(...args: LockUpgrConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LockUpgr> {
    return super.deploy(overrides || {}) as Promise<LockUpgr>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LockUpgr {
    return super.attach(address) as LockUpgr;
  }
  override connect(signer: Signer): LockUpgr__factory {
    return super.connect(signer) as LockUpgr__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LockUpgrInterface {
    return new utils.Interface(_abi) as LockUpgrInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LockUpgr {
    return new Contract(address, _abi, signerOrProvider) as LockUpgr;
  }
}
