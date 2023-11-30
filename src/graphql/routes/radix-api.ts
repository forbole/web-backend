import { RESTDataSource } from "@apollo/datasource-rest";

const { RADIX_URL } = process.env;

if (!RADIX_URL) {
  throw new Error("Missing RADIX_URL env var");
}

type RadixResponse = {
  token: {
    token_supply: {
      value: string;
    };
  };
};

export class RadixAPI extends RESTDataSource {
  override baseURL = `${(RADIX_URL as string).replace(/\/$/, "")}/`;

  async getTotalRadixSupply(): Promise<RadixResponse> {
    return this.post("token/native", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        network_identifier: {
          network: "mainnet",
        },
      }),
    });
  }

  async getRadixUnbondingTime() {
    const unbondingTime = "1-3 weeks (500 epochs)";

    return unbondingTime;
  }
}
