import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

require("dotenv").config();

export class CosmosAPI extends RESTDataSource {
  override baseURL = `${process.env.PROM_QUERY_URL}/prometheus/api/v1/`;

  constructor(options: { cache: KeyValueCache }) {
    super(options); // this sends our server's `cache` through
  }

  async getAllCosmosUsers() {
    return this.get(
      `query?query=sum(max_over_time(tendermint_validator_delegators_total[${process.env.MAX_OVER_TIME_DURATION}]))`,
    );
  }

  async getAllCosmosTVL() {
    return this.get(
      `query?query=sum(max_over_time(tendermint_validator_voting_power_total[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price)`,
    );
  }

  async getEachCosmosChainTVL() {
    return this.get(
      `query?query=max_over_time(tendermint_validator_voting_power_total[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`,
    );
  }

  async getEachCosmosBondedToken() {
    return this.get(
      `query?query=max_over_time(tendermint_bonded_token[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getEachCosmosCommission() {
    return this.get(
      `query?query=max_over_time(tendermint_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getEachCosmosUnbondingTime() {
    return this.get(
      `query?query=max_over_time(tendermint_unbonding_time[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getEachCosmosAPY() {
    return this.get(
      `query?query=(max_over_time(tendermint_inflation_rate[${process.env.MAX_OVER_TIME_DURATION}]) * (1 - tendermint_community_tax_rate)) / (tendermint_bonded_token / tendermint_circulating_supply)`,
    );
  }

  async getEachCosmosTokenSupply() {
    return this.get(
      `query?query=max_over_time(tendermint_circulating_supply[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }

  async getEachCosmosInflationRate() {
    return this.get(
      `query?query=max_over_time(tendermint_inflation_rate[${process.env.MAX_OVER_TIME_DURATION}])`,
    );
  }
}
