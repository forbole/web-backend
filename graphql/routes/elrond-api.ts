import { RESTDataSource } from '@apollo/datasource-rest';
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export class ElrondAPI extends RESTDataSource {
     override baseURL = `http://${process.env.PROMETHEUS_URL}/prometheus/api/v1/`

     constructor(options: { cache: KeyValueCache }) {
          super(options); // this sends our server's `cache` through
     }

     async getElrondAPY(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_provider_apr[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondTVL(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_provider_locked[${process.env.MAX_OVER_TIME_DURATION}]) * on (denom) token_price`)
     }

     async getElrondCommission(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_provider_service_fee[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondBondedToken(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_provider_locked[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondTotalSupply(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_total_supply[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondCirculatingSupply(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_circulating_supply[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondUsers(): Promise<any> {
          return this.get<any>(`query?query=max_over_time(elrond_provider_num_users[${process.env.MAX_OVER_TIME_DURATION}])`)
     }

     async getElrondUnbondingTime(): Promise<any> {
          const unbondingTime = 10
          return unbondingTime
     }

}