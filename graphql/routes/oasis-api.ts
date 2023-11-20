import { RESTDataSource } from "@apollo/datasource-rest";
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export class OasisAPI extends RESTDataSource {
  override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`;

  constructor(options: { cache: KeyValueCache }) {
    super(options); // this sends our server's `cache` through
  }

  async getOasisUsers(): Promise<any> {
    return this.get<any>(
      `query?query=max_over_time(oasis_validator_delegators_total[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisBondedToken(): Promise<any> {
    return this.get<any>(
      `query?query=max_over_time(oasis_validator_staked[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisCommission(): Promise<any> {
    return this.get<any>(
      `query?query=max_over_time(oasis_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisTVL(): Promise<any> {
    return this.get<any>(
      `query?query=max_over_time(oasis_validator_staked{}[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`,
    );
  }
}
