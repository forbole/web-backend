import { RESTDataSource } from "@apollo/datasource-rest";

const validatorAddress =
  "archwayvaloper1esg4kluvdkfcxl0atcf2us2p9m9y9sjjsu04ex";

// GET https://api.mainnet.archway.io/cosmos/bank/v1beta1/denoms_metadata
const decimalsOfAArchwayBondenToken = 18;

// https://api.mainnet.archway.io/swagger/
export class ArchwayAPI extends RESTDataSource {
  override baseURL = `https://api.mainnet.archway.io`;

  async getArchwayBondenToken() {
    const result = await this.get(`/staking/validators/${validatorAddress}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const bondedToken =
      result?.result?.tokens / 10 ** decimalsOfAArchwayBondenToken;

    if (!bondedToken || Number.isNaN(bondedToken)) {
      return {
        status: "error",
        error: "bondedToken is not a number",
      };
    }

    return {
      status: "ok",
      data: {
        bondedToken: bondedToken.toFixed(0),
      },
    };
  }
}
