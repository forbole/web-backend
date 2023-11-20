import { RESTDataSource } from "@apollo/datasource-rest";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";

export class RadixAPI extends RESTDataSource {
  override baseURL = `${process.env.RADIX_URL}/`;

  constructor(options: { cache: KeyValueCache }) {
    super(options); // this sends our server's `cache` through
  }

  async getTotalRadixSupply(body: any) {
    return this.post("token/native", {
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  }

  async getRadixUnbondingTime() {
    const unbondingTime = "1-3 weeks (500 epochs)";

    return unbondingTime;
  }
}
