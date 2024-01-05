import { RESTDataSource } from "@apollo/datasource-rest";

// https://www.coingecko.com/
export class CoinGeckoDataSource extends RESTDataSource {
  baseURL = "https://api.coingecko.com";

  getCoinPrice(denom: string) {
    return this.get(`/api/v3/coins/${denom}`).then(
      (res) => res.market_data.current_price.usd,
    );
  }
}
