import { RESTDataSource } from "@apollo/datasource-rest";

const validatorAddress =
  "archwayvaloper1esg4kluvdkfcxl0atcf2us2p9m9y9sjjsu04ex";

// GET https://api.mainnet.archway.io/cosmos/bank/v1beta1/denoms_metadata
const decimalsOfAArchwayBondenToken = 18;

// https://api.mainnet.archway.io/swagger/
export class ArchwayAPI extends RESTDataSource {
  override baseURL = `https://api.mainnet.archway.io`;

  async getArchwayAPY() {
    const [inflationResponse, validatorResponse, supplyResponse] =
      await Promise.all([
        this.get(`/minting/inflation`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        this.get(`/staking/validators/${validatorAddress}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        this.get(`/cosmos/bank/v1beta1/supply`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

    const inflation = inflationResponse?.result;
    const supplyDenom = supplyResponse.supply.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.denom === "aarch",
    );

    const bondedToken =
      validatorResponse?.result?.tokens / 10 ** decimalsOfAArchwayBondenToken;
    const supplyNormalized =
      Number(supplyDenom?.amount) / 10 ** decimalsOfAArchwayBondenToken;

    const APY = (Number(inflation) * 0.01) / (bondedToken / supplyNormalized);

    return {
      status: "ok",
      data: {
        APY,
      },
    };
  }

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
