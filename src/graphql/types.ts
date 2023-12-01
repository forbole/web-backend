import type { ArchwayAPI } from "./routes/archway-api";
import type { CosmosAPI } from "./routes/cosmos-api";
import type { ElrondAPI } from "./routes/elrond-api";
import type { OasisAPI } from "./routes/oasis-api";
import type { RadixAPI } from "./routes/radix-api";
import type { RadixPromAPI } from "./routes/radix-prom-api";
import type { SolanaAPI } from "./routes/solana-api";
import type { SuiAPI } from "./routes/sui-api";

type DataSources = {
  archwayAPI: ArchwayAPI;
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
