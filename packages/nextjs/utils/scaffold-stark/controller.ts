"use client";

import { Chain, mainnet, sepolia } from "@starknet-react/chains";
import {
  jsonRpcProvider,
  publicProvider,
  starknetChainId,
  InjectedConnector,
} from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
import { constants } from "starknet";
import scaffoldConfig from "~~/scaffold.config";
import { SessionPolicies } from "@cartridge/controller";

// Constantes para contratos
export const ETH_CONTRACT_ADDRESS =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
export const STRK_CONTRACT_ADDRESS =
  "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D";

// Función para verificar si hay devnet en las redes objetivo
const containsDevnet = (networks: readonly Chain[]) => {
  return networks.some((it) => it.network === "devnet");
};

// Función para obtener el provider según la configuración
export const getProvider = () => {
  if (
    scaffoldConfig.rpcProviderUrl === "" ||
    containsDevnet(scaffoldConfig.targetNetworks)
  ) {
    return publicProvider();
  }

  return jsonRpcProvider({
    rpc: () => ({
      nodeUrl: scaffoldConfig.rpcProviderUrl,
      chainId: starknetChainId(scaffoldConfig.targetNetworks[0].id),
    }),
  });
};

// Configuración de las cadenas
const chains = [
  {
    id: constants.StarknetChainId.SN_SEPOLIA,
    name: "Sepolia",
    rpcUrl:
      process.env.NEXT_PUBLIC_RPC_SEPOLIA ??
      "https://api.cartridge.gg/x/starknet/sepolia",
  },
  {
    id: constants.StarknetChainId.SN_MAIN,
    name: "Mainnet",
    rpcUrl:
      process.env.NEXT_PUBLIC_RPC_MAINNET ??
      "https://api.cartridge.gg/x/starknet/mainnet",
  },
];

// Políticas para el controller
const policies: SessionPolicies = {
  contracts: {
    [ETH_CONTRACT_ADDRESS]: {
      methods: [{ name: "approve", entrypoint: "approve" }],
    },
    [STRK_CONTRACT_ADDRESS]: {
      methods: [{ name: "approve", entrypoint: "approve" }],
    },
  },
};

// Crear instancia del controller
export const controllerInstance = new ControllerConnector({
  policies,
  defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
  chains: chains,
  url: process.env.NEXT_PUBLIC_KEYCHAIN_DEPLOYMENT_URL,
  profileUrl: process.env.NEXT_PUBLIC_PROFILE_DEPLOYMENT_URL,
}) as unknown as InjectedConnector;

// Helper para manejar la desconexión
export function withDisconnectWrapper(connector: InjectedConnector) {
  const connectorDisconnect = connector.disconnect;
  const _disconnect = async (): Promise<void> => {
    localStorage.removeItem("lastUsedConnector");
    localStorage.removeItem("lastConnectedTime");
    return connectorDisconnect();
  };
  connector.disconnect = _disconnect.bind(connector);
  return connector;
}

// Configuración completa del provider
export const providerConfig = {
  autoConnect: true,
  connectors: [withDisconnectWrapper(controllerInstance)],
  chains: scaffoldConfig.targetNetworks,
  provider: getProvider(),
};
