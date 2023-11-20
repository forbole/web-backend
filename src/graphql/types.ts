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
