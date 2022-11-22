import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export class SolanaAPI extends RESTDataSource {
    override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

    constructor(options: { cache: KeyValueCache }) {
        super(options); // this sends our server's `cache` through
    }

    async getSolanaUsers(): Promise<any> {
        return this.get<any>(`query?query=solana_validator_delegators_count`)
    }

    async getStakedSolana(): Promise<any> {
        return this.get<any>(`query?query=solana_validator_staked`)
    }

    async getSolanaTVL(): Promise<any> {
        return this.get<any>(`query?query=solana_validator_staked{} * on (denom) group_left token_price`)
    }

    async getSolanaCommission(): Promise<any> {
        return this.get<any>(`query?query=solana_validator_commission_rate`)
    }

}