import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export class ElrondAPI extends RESTDataSource {
    override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

    constructor(options: { cache: KeyValueCache }) {
        super(options); // this sends our server's `cache` through
    }

    async getElrondAPY(): Promise<any> {
        return this.get<any>(`query?query=elrond_provider_apr`)
    }

    async getElrondTVL(): Promise<any> {
        return this.get<any>(`query?query=elrond_provider_locked * on (denom) token_price`)
    }

   async getElrondCommission(): Promise<any> {
        return this.get<any>(`query?query=elrond_provider_service_fee`)
   }

   async getElrondBondedToken(): Promise<any> {
        return this.get<any>(`query?query=elrond_provider_locked`)
   }
}