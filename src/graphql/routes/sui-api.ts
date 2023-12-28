import type { DataSourceConfig } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";

import { suiValidatorAddress } from "../utils/addresses";
import { CoinGeckoDataSource } from "../utils/coingecko-data";

if (!process.env.DEVTOOLS_API_KEY) {
  throw new Error("DEVTOOLS_API_KEY is not set");
}

const coinDecimals = 9;

// https://docs.sui.io/
export class SuiAPI extends RESTDataSource {
  override baseURL = `https://rpc-mainnet-sui.forbole.com`;
  private gecko: CoinGeckoDataSource;

  constructor(options: DataSourceConfig) {
    super(options);

    this.gecko = new CoinGeckoDataSource(options);
  }

  private getRequestContent(body: unknown) {
    return {
      body: JSON.stringify(body),
      headers: {
        "apikey": `${process.env.DEVTOOLS_API_KEY}`,
        "content-type": "application/json",
      },
    };
  }

  private async getValidator() {
    const response = await this.post(
      `/`,
      this.getRequestContent({
        id: 1,
        jsonrpc: "2.0",
        // This is the same method used by the official explorer
        method: "suix_getLatestSuiSystemState",
        params: [],
      }),
    );

    return response.result.activeValidators.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v: any) => v.suiAddress === suiValidatorAddress,
    );
  }

  async getAPY() {
    const response = await this.post(
      `/`,
      this.getRequestContent({
        id: 1,
        jsonrpc: "2.0",
        method: "suix_getValidatorsApy",
        params: [],
      }),
    );

    const validatorItem = response.result.apys.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v: any) => v.address === suiValidatorAddress,
    );

    if (!validatorItem) {
      return {
        status: "error",
      };
    }

    return {
      data: {
        APY: validatorItem.apy,
      },
      status: "ok",
    };
  }

  async getBondedToken() {
    const validator = await this.getValidator();

    // https://github.com/MystenLabs/sui/blob/cdcfa76c4304caff2496e7b9ba535086704585d5/apps/explorer/src/components/validator/ValidatorStats.tsx#L31
    const bondedToken = validator?.stakingPoolSuiBalance / 10 ** coinDecimals;

    return {
      data: {
        bondedToken,
      },
      status: "ok",
    };
  }

  async getTVL() {
    const [validator, coinPrice] = await Promise.all([
      this.getValidator(),
      this.gecko.getCoinPrice("sui"),
    ]);

    const tokens = validator?.poolTokenBalance / 10 ** coinDecimals;

    return {
      data: {
        TVL: tokens * Number(coinPrice),
      },
      status: "ok",
    };
  }
}
