import { RESTDataSource } from "@apollo/datasource-rest";

export class OasisAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;

  async getOasisUsers() {
    return this.get(
      `query?query=max_over_time(oasis_validator_delegators_total[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisBondedToken() {
    return this.get(
      `query?query=max_over_time(oasis_validator_staked[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisCommission() {
    return this.get(
      `query?query=max_over_time(oasis_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getOasisTVL() {
    return this.get(
      `query?query=max_over_time(oasis_validator_staked{}[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`,
    );
  }
}
