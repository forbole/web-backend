import type { DataSourceConfig } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";

import { archwayValidatorAddress } from "../utils/addresses";
import { CoinGeckoDataSource } from "../utils/coingecko-data";

// GET https://api.mainnet.archway.io/cosmos/bank/v1beta1/denoms_metadata
const decimalsOfAArchwayBondenToken = 18;

// https://api.mainnet.archway.io/swagger/
export class ArchwayAPI extends RESTDataSource {
  override baseURL = `https://api.mainnet.archway.io`;
  private gecko: CoinGeckoDataSource;

  constructor(options: DataSourceConfig) {
    super(options);

    this.gecko = new CoinGeckoDataSource(options);
  }

  async getAPY() {
    const [inflationResponse, validatorResponse, supplyResponse] =
      await Promise.all([
        this.get(`/minting/inflation`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        this.get(`/staking/validators/${archwayValidatorAddress}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        this.get(`/cosmos/bank/v1beta1/supply/aarch`, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);

    const inflation = inflationResponse?.result;

    const bondedToken =
      validatorResponse?.result?.tokens / 10 ** decimalsOfAArchwayBondenToken;

    const supplyNormalized =
      Number(supplyResponse?.amount?.amount) /
      10 ** decimalsOfAArchwayBondenToken;

    if (
      !inflation ||
      Number.isNaN(inflation) ||
      !bondedToken ||
      Number.isNaN(bondedToken) ||
      !supplyNormalized ||
      Number.isNaN(supplyNormalized)
    ) {
      return {
        error: "inflation, bondedToken or supplyNormalized is not a number",
        status: "error",
      };
    }

    const APY = (Number(inflation) * 0.01) / (bondedToken / supplyNormalized);

    return {
      data: {
        APY,
      },
      status: "ok",
    };
  }

  async getBondedToken() {
    const result = await this.get(
      `/staking/validators/${archwayValidatorAddress}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const bondedToken =
      result?.result?.tokens / 10 ** decimalsOfAArchwayBondenToken;

    if (!bondedToken || Number.isNaN(bondedToken)) {
      return {
        error: "bondedToken is not a number",
        status: "error",
      };
    }

    return {
      data: {
        bondedToken: bondedToken.toFixed(0),
      },
      status: "ok",
    };
  }

  async getTVL() {
    const [validatorResponse, coinPrice] = await Promise.all([
      this.get(`/staking/validators/${archwayValidatorAddress}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      this.gecko.getCoinPrice("archway"),
    ]);

    // https://github.com/forbole/cosmos-exporter/blob/8e78b8ea5a37d113f3448c423540df4edb1f4ebb/collector/validator_status.go#L40C72-L40C72
    // Validator.DelegatorShares
    const tokens =
      Number(validatorResponse.result.delegator_shares) /
      10 ** decimalsOfAArchwayBondenToken;

    const TVL = tokens * Number(coinPrice);

    return {
      data: {
        TVL,
      },
      status: "ok",
    };
  }
}
