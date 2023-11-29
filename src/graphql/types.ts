import type {
  CosmosAPI,
  ElrondAPI,
  OasisAPI,
  RadixAPI,
  RadixPromAPI,
  SolanaAPI,
  SuiAPI,
} from "./routes";

type DataSources = {
  cosmosAPI: CosmosAPI;
  elrondAPI: ElrondAPI;
  oasisAPI: OasisAPI;
  radixAPI: RadixAPI;
  radixPromAPI: RadixPromAPI;
  solanaAPI: SolanaAPI;
  suiAPI: SuiAPI;
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
