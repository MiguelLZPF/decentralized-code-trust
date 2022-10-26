/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { CodeTrust, CodeTrustInterface } from "../../contracts/CodeTrust";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "extTimestamp",
        type: "uint256",
      },
    ],
    name: "isTrustedCode",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedCode",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "trustCodeAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "trustedCode",
        type: "address",
      },
    ],
    name: "untrustCodeAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610873806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634f9402701461004657806383e5e64014610076578063920517e614610092575b600080fd5b610060600480360381019061005b91906105d9565b6100ae565b60405161006d9190610647565b60405180910390f35b610090600480360381019061008b9190610662565b6101a9565b005b6100ac60048036038101906100a7919061068f565b610306565b005b60008082036100bb574291505b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036100f3573392505b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050600181148061018d575060054261018a91906106fe565b81115b1561019c5760019150506101a2565b60009150505b9392505050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506001811480610243575060054261024091906106fe565b81115b610282576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610279906107b1565b60405180910390fd5b426000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b3273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361041d57600a811015801561034e57506301e133808111155b61038d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103849061081d565b60405180910390fd5b804261039991906106fe565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061053c565b60038110156104af5760019050806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061053b565b80426104bb91906106fe565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b5050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061057082610545565b9050919050565b61058081610565565b811461058b57600080fd5b50565b60008135905061059d81610577565b92915050565b6000819050919050565b6105b6816105a3565b81146105c157600080fd5b50565b6000813590506105d3816105ad565b92915050565b6000806000606084860312156105f2576105f1610540565b5b60006106008682870161058e565b93505060206106118682870161058e565b9250506040610622868287016105c4565b9150509250925092565b60008115159050919050565b6106418161062c565b82525050565b600060208201905061065c6000830184610638565b92915050565b60006020828403121561067857610677610540565b5b60006106868482850161058e565b91505092915050565b600080604083850312156106a6576106a5610540565b5b60006106b48582860161058e565b92505060206106c5858286016105c4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610709826105a3565b9150610714836105a3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610749576107486106cf565b5b828201905092915050565b600082825260208201905092915050565b7f416c726561647920657870697265640000000000000000000000000000000000600082015250565b600061079b600f83610754565b91506107a682610765565b602082019050919050565b600060208201905081810360008301526107ca8161078e565b9050919050565b7f496e76616c6964206475726174696f6e2c20636865636b20446f630000000000600082015250565b6000610807601b83610754565b9150610812826107d1565b602082019050919050565b60006020820190508181036000830152610836816107fa565b905091905056fea264697066735822122014a2eb6eb1f5a07b72a67849a07da5517428b88e67ca12dbf391bf72023b805a64736f6c634300080d0033";

type CodeTrustConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CodeTrustConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CodeTrust__factory extends ContractFactory {
  constructor(...args: CodeTrustConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CodeTrust> {
    return super.deploy(overrides || {}) as Promise<CodeTrust>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CodeTrust {
    return super.attach(address) as CodeTrust;
  }
  override connect(signer: Signer): CodeTrust__factory {
    return super.connect(signer) as CodeTrust__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CodeTrustInterface {
    return new utils.Interface(_abi) as CodeTrustInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CodeTrust {
    return new Contract(address, _abi, signerOrProvider) as CodeTrust;
  }
}
