import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export class CosmosAPI extends RESTDataSource {
    override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

    constructor(options: { cache: KeyValueCache }) {
        super(options); // this sends our server's `cache` through
    }

    async getAllCosmosUsers(): Promise<any> {
        return this.get<any>(`query?query=sum(tendermint_validator_delegators_total)`);
    }

    async getAllCosmosTVL(): Promise<any> {
        return this.get<any>(`query?query=sum (tendermint_validator_voting_power_total * on (denom) group_left token_price)`)
    }

    async getEachCosmosChainTVL(): Promise<any> {
        return this.get<any>(`query?query=tendermint_validator_voting_power_total * on (denom) group_left token_price`)
    }

    async getEachCosmosBondedToken(): Promise<any> {
        return this.get<any>(`query?query=tendermint_bonded_token`)
    }

    async getEachCosmosCommission(): Promise<any> {
        return this.get<any>(`query?query=tendermint_validator_commission_rate`)
    }

    async getEachCosmosUnbondingTime(): Promise<any> {
        return this.get<any>(`query?query=tendermint_unbonding_time`)
    }

    async getEachCosmosAPY(): Promise<any> {
        return this.get<any>(`query?query=(tendermint_inflation_rate * (1 - tendermint_community_tax_rate)) / (tendermint_bonded_token / tendermint_circulating_supply)`)
    }

    async getEachCosmosTokenSupply(): Promise<any> {
        return this.get<any>(`query?query=tendermint_circulating_supply`);
    }

}