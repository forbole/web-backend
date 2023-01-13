import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export class SolanaAPI extends RESTDataSource {
    override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

    constructor(options: { cache: KeyValueCache }) {
        super(options); // this sends our server's `cache` through
    }

    async getSolanaUsers(): Promise<any> {
        return this.get<any>(`query?query=max_over_time(solana_validator_delegators_count[${process.env.MAX_OVER_TIME_DURATION}])`)
    }

    async getStakedSolana(): Promise<any> {
        return this.get<any>(`query?query=max_over_time(solana_validator_staked[${process.env.MAX_OVER_TIME_DURATION}])`)
    }

    async getSolanaTVL(): Promise<any> {
        return this.get<any>(`query?query=max_over_time(solana_validator_staked{}[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) group_left token_price`)
    }

    async getSolanaCommission(): Promise<any> {
        return this.get<any>(`query?query=max_over_time(solana_validator_commission_rate[${process.env.MAX_OVER_TIME_DURATION}])`)
    }

    async getSolanaUnbondingTime(): Promise<any> {
        const unbondingTime = 10
        return unbondingTime
    }

}