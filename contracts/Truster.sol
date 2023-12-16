// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interfaces/ICodeTrust.sol";

/**
 * @title Truster
 * @author Miguel Gomez Carpena
 * @notice This contract provides a framework for implementing code trust in decentralized applications.
 *         Contracts that inherit from this contract can enforce trust by implementing specific trust mechanisms.
 */
abstract contract Truster {
  ICodeTrust internal _codeTrust;
}
