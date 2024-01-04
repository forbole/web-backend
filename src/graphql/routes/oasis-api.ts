import type { DataSourceConfig } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";

import { oasisValidatorAddress } from "../utils/addresses";
import { CoinGeckoDataSource } from "../utils/coingecko-data";

// https://www.oasisscan.com/validators/detail/oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0

export class OasisAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;
  private gecko: CoinGeckoDataSource;

  constructor(options: DataSourceConfig) {
    super(options);

    this.gecko = new CoinGeckoDataSource(options);
  }

  async getOasisBondedToken() {
    return [
      {
        metric: {
          identity: oasisValidatorAddress,
        },
        // @hardcoded
        value: 57163716.09,
      },
    ];
  }

  async getOasisCommission() {
    return this.get(
      `query?query=max_over_time(oasis_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisTVL() {
    // @hardcoded
    const base = 932608;
    const price = await this.gecko.getCoinPrice("rose");

    return [
      {
        value: base * price,
      },
    ];
  }

  async getOasisUsers() {
    return [
      {
        metric: {
          identity: oasisValidatorAddress,
        },
        // @hardcoded
        value: 137,
      },
    ];
  }
}
