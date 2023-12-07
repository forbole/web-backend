import { RESTDataSource } from "@apollo/datasource-rest";

export class RadixPromAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;

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
