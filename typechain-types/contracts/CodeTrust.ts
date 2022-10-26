/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface CodeTrustInterface extends utils.Interface {
  functions: {
    "isTrustedCode(address,address,uint256)": FunctionFragment;
    "trustCodeAt(address,uint256)": FunctionFragment;
    "untrustCodeAt(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "isTrustedCode" | "trustCodeAt" | "untrustCodeAt"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isTrustedCode",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "trustCodeAt",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "untrustCodeAt",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "isTrustedCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "trustCodeAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "untrustCodeAt",
    data: BytesLike
  ): Result;

  events: {};
}

export interface CodeTrust extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CodeTrustInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    isTrustedCode(
      trustedContract: PromiseOrValue<string>,
      by: PromiseOrValue<string>,
      extTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    trustCodeAt(
      trustedCode: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    untrustCodeAt(
      trustedCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  isTrustedCode(
    trustedContract: PromiseOrValue<string>,
    by: PromiseOrValue<string>,
    extTimestamp: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  trustCodeAt(
    trustedCode: PromiseOrValue<string>,
    duration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  untrustCodeAt(
    trustedCode: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    isTrustedCode(
      trustedContract: PromiseOrValue<string>,
      by: PromiseOrValue<string>,
      extTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    trustCodeAt(
      trustedCode: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    untrustCodeAt(
      trustedCode: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    isTrustedCode(
      trustedContract: PromiseOrValue<string>,
      by: PromiseOrValue<string>,
      extTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    trustCodeAt(
      trustedCode: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    untrustCodeAt(
      trustedCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isTrustedCode(
      trustedContract: PromiseOrValue<string>,
      by: PromiseOrValue<string>,
      extTimestamp: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    trustCodeAt(
      trustedCode: PromiseOrValue<string>,
      duration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    untrustCodeAt(
      trustedCode: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
