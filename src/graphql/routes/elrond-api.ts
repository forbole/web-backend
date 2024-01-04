import { RESTDataSource } from "@apollo/datasource-rest";

export class ElrondAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;

  async getElrondAPY() {
    return this.get(
      `query?query=max_over_time(elrond_provider_apr[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getElrondBondedToken() {
    return this.get(
      `query?query=max_over_time(elrond_provider_locked[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getElrondCirculatingSupply() {
    return this.get(
      `query?query=max_over_time(elrond_circulating_supply[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getElrondCommission() {
    return this.get(
      `query?query=max_over_time(elrond_provider_service_fee[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getElrondTotalSupply() {
    return this.get(
      `query?query=max_over_time(elrond_total_supply[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getElrondTVL() {
    return this.get(
      `query?query=max_over_time(elrond_provider_locked[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) token_price`,
    );
  }

  async getElrondUnbondingTime() {
    const unbondingTime = 10;

    return unbondingTime;
  }

  async getElrondUsers() {
    return this.get(
      `query?query=max_over_time(elrond_provider_num_users[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }
}
