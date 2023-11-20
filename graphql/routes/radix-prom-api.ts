import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

require("dotenv").config();

export class RadixPromAPI extends RESTDataSource {
  override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`;

  constructor(options: { cache: KeyValueCache }) {
    super(options);
  }

  async getRadixTVL() {
    return this.get(
      `query?query=max_over_time(radix_validator_staked{}[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`,
    );
  }

  async getRadixUsers() {
    return this.get(
      `query?query=max_over_time(radix_validator_delegators_total[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getStakedRadix() {
    return this.get(
      `query?query=max_over_time(radix_validator_staked[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }
}
