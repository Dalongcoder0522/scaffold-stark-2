"use client";
import ControllerConnector from "@cartridge/connector/controller";
import { Chain, mainnet, sepolia } from "@starknet-react/chains";
import { InjectedConnector } from "@starknet-react/core";
import { constants } from "starknet";

function controllerProvider(chain: Chain) {
  switch (chain) {
    case mainnet:
      return { nodeUrl: "https://api.cartridge.gg/x/starknet/mainnet" };
    case sepolia:
      return { nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia" };
    default:
      return { nodeUrl: "https://api.cartridge.gg/x/starknet/sepolia" };
  }
}

export const controllerInstance = new ControllerConnector({
  // Usamos los IDs de cadena oficiales de Starknet
  defaultChainId: constants.StarknetChainId.SN_SEPOLIA, // o .SN_MAIN para mainnet
  chains: [
    {
      rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
    },
    {
      rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet",
    },
  ],
}) as never as InjectedConnector;
