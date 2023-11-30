import { RESTDataSource } from "@apollo/datasource-rest";

export class SolanaAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;

  async getSolanaUsers() {
    return this.get(
      `query?query=max_over_time(solana_validator_delegators_count[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getStakedSolana() {
    return this.get(
      `query?query=max_over_time(solana_validator_staked[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getSolanaTVL() {
    return this.get(
      `query?query=max_over_time(solana_validator_staked{}[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`,
    );
  }

  async getSolanaCommission() {
    return this.get(
      `query?query=max_over_time(solana_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getSolanaUnbondingTime() {
    const unbondingTime = 10;

    return unbondingTime;
  }
}
