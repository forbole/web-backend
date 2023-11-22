import type {
  CosmosAPI,
  ElrondAPI,
  OasisAPI,
  RadixAPI,
  RadixPromAPI,
  SolanaAPI,
} from "./routes";

type DataSources = {
  cosmosAPI: CosmosAPI;
  radixAPI: RadixAPI;
  elrondAPI: ElrondAPI;
  solanaAPI: SolanaAPI;
  oasisAPI: OasisAPI;
  radixPromAPI: RadixPromAPI;
};

export interface ContextValue {
  dataSources: DataSources;
}

type ResultCommon = {
  value: [number, string];
  metric: {
    address?: string;
    chain?: string;
    chain_id?: string;
    denom?: string;
    identity?: string;
    instance?: string;
    provider_address?: string;
    validator_address?: string;
  };
};

export type Response =
  | {
      data: unknown;
      error: string;
      status: "error";
    }
  | {
      status: "ok";
      data: {
        result: ResultCommon[];
      };
    };
