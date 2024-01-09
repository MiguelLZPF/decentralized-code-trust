// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "contracts/interfaces/ICodeTrust.sol";

/**
 * @title Truster
 * @author Miguel Gomez Carpena
 * @notice This contract provides a framework for implementing code trust in decentralized applications.
 *         Contracts that inherit from this contract can enforce trust by implementing specific trust mechanisms.
 */
abstract contract Truster {
  ICodeTrust internal _codeTrust;
  /**
   * @dev Modifier that allows only trusted code to execute a function.
   * It checks if the specified contract is trusted code using the `_codeTrust.isTrustedCode` function.
   * If the contract is not trusted, it reverts with an error message.
   */
  modifier onlyTrustedCode() {
    require(_codeTrust.isTrustedCode(msg.sender, address(0), 0), "Not trusted code");
    _;
  }
}
