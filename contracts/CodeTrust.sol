//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./interfaces/ICodeTrust.sol";

/**
 * @title Code Trust
 * @author Miguel Gomez Carpena
 */
contract CodeTrust is ICodeTrust {
  //     [truster -->       contract] --> expiration
  mapping(address => mapping(address => uint256)) private trustedCodeExp;

  function trustCodeAt(address trustedCode, uint256 duration) external {
    if (msg.sender == tx.origin) {
      // the sender is an EOA (31536000 sec = 1 year)
      require(duration >= 10 && duration <= 31536000, "Invalid duration, check Doc");
      trustedCodeExp[msg.sender][trustedCode] = block.timestamp + duration;
    } else {
      // the sender is another contract
      if (duration < 3) {
        duration = 1;
        trustedCodeExp[msg.sender][trustedCode] = duration;
      } else {
        trustedCodeExp[msg.sender][trustedCode] = block.timestamp + duration;
      }
    }
  }

  function untrustCodeAt(address trustedCode) external {
    uint256 actualExpiration = trustedCodeExp[msg.sender][trustedCode];
    // or it has no expiration (infinite) OR it has expiration and is further than the current timestamp
    require(actualExpiration == 1 || actualExpiration > block.timestamp + 5, "Already expired");
    trustedCodeExp[msg.sender][trustedCode] = block.timestamp;
  }

  function isTrustedCode(
    address trustedContract,
    address by,
    uint256 extTimestamp
  ) external view returns (bool) {
    if (extTimestamp == 0) {
      extTimestamp = block.timestamp;
    }
    // set sender by default
    if (by == address(0)) {
      by = msg.sender;
    }
    uint256 actualExpiration = trustedCodeExp[by][trustedContract];
    // or it has no expiration (infinite) OR it has expiration and is further than the current timestamp
    if (actualExpiration == 1 || actualExpiration > block.timestamp + 5) {
      return true;
    } else {
      return false;
    }
  }
}
