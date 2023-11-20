import { RESTDataSource } from "@apollo/datasource-rest";
// KeyValueCache is the type of Apollo server's default cache
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class RadixAPI extends RESTDataSource {
  override baseURL = `${process.env.RADIX_URL}/`;

  constructor(options: { cache: KeyValueCache }) {
    super(options); // this sends our server's `cache` through
  }

  async getTotalRadixSupply(body: any): Promise<any> {
    return this.post<any>("token/native", {
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }

  async getRadixUnbondingTime(): Promise<any> {
    const unbondingTime = "1-3 weeks (500 epochs)";

    return unbondingTime;
  }
}
