// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title (Interface) Code Trust
 * @author Miguel Gomez Carpena
 * @dev Interface of contract CodeTrust
 */
interface ICodeTrust {
  /**
   * @notice any sender can use this method to trust other address (should be a contract address)
   * @dev it checks if the address is a contract address or a EOA comparing the msg.sender and tx.origin to force having duration or not
   * @param trustedCode the address of the contract address to be trusted
   * @param duration (optional) [1] datetime to trust this contract code. Mandatory if this call comes from a EOA. If sender is another contract, can be 1 meaning infinite duration
   */
  function trustCodeAt(address trustedCode, uint256 duration) external;

  /**
   * @notice simple method to explicitly untrust a previously trusted contract
   * @param trustedCode the address of the contract to be untrusted
   */
  function untrustCodeAt(address trustedCode) external;

  /**
   * @notice method to check if a contract is trusted by any address
   * @param trustedCode the address of the contract to be checked
   * @param by (optional) [sender] the address of the one that is trusting the contract or not (truster?? X-))
   * @param extTimestamp (optional) [block.timestamp] external timestamp to use as time reference
   * @return bool wheater the contract is trusted by "by" address or not
   */
  function isTrustedCode(
    address trustedCode,
    address by,
    uint256 extTimestamp
  ) external view returns (bool);
}
