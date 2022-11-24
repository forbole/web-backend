import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export class OasisAPI extends RESTDataSource {
    override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

    constructor(options: { cache: KeyValueCache }) {
        super(options); // this sends our server's `cache` through
    }

    async getOasisUsers(): Promise<any> {
        return this.get<any>(`query?query=oasis_validator_delegators_total`);
    }

    async getOasisBondedToken(): Promise<any> {
        return this.get<any>(`query?query=oasis_validator_voting_power_total`);
    }

    async getOasisCommission(): Promise<any> {
        return this.get<any>(`query?query=oasis_validator_commission_rate`);
    }

    async getOasisTVL(): Promise<any> {
        return this.get<any>(`query?query=oasis_validator_voting_power_total  * on (denom) token_price`);
    }
}