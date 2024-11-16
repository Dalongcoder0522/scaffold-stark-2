/**
 * This file is autogenerated by Scaffold-Stark.
 * You should not edit it manually or your changes might be overwritten.
 */

import {
  katanaEthClassHash,
  katanaStrkClassHash,
  devnetEthClassHash,
  devnetStrkClassHash,
  universalEthAddress,
  sepoliaMainnetEthClassHash,
  universalStrkAddress,
  sepoliaMainnetStrkClassHash,
  universalErc20Abi,
} from "../utils/Constants";

const preDeployedContracts = {
  katana: {
    Eth: {
      address: universalEthAddress,
      abi: universalErc20Abi,
      classHash: katanaEthClassHash,
    },
    Strk: {
      address: universalStrkAddress,
      abi: universalErc20Abi,
      classHash: katanaStrkClassHash,
    },
  },
  devnet: {
    Eth: {
      address: universalEthAddress,
      abi: universalErc20Abi,
      classHash: devnetEthClassHash,
    },
    Strk: {
      address: universalStrkAddress,
      abi: universalErc20Abi,
      classHash: devnetStrkClassHash,
    },
  },
  sepolia: {
    Eth: {
      address: universalEthAddress,
      abi: universalErc20Abi,
      classHash: sepoliaMainnetEthClassHash,
    },
    Strk: {
      address: universalStrkAddress,
      abi: universalErc20Abi,
      classHash: sepoliaMainnetStrkClassHash,
    },
  },
  mainnet: {
    Eth: {
      address: universalEthAddress,
      abi: universalErc20Abi,
      classHash: sepoliaMainnetEthClassHash,
    },
    Strk: {
      address: universalStrkAddress,
      abi: universalErc20Abi,
      classHash: sepoliaMainnetStrkClassHash,
    },
  },
} as const;

export default preDeployedContracts;
