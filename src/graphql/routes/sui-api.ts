import { RESTDataSource } from "@apollo/datasource-rest";

if (!process.env.DEVTOOLS_API_KEY) {
  throw new Error("DEVTOOLS_API_KEY is not set");
}

// https://suiexplorer.com/validator/0x1e1985024aafe50a8e4eafc5a89eb7ecd58ba08c39f37688bee00bd55c8b2059
const validatorAddress =
  "0x1e1985024aafe50a8e4eafc5a89eb7ecd58ba08c39f37688bee00bd55c8b2059";

// https://docs.sui.io/
export class SuiAPI extends RESTDataSource {
  override baseURL = `https://rpc-mainnet-sui.forbole.com`;

  private getRequestContent(body: unknown) {
    return {
      headers: {
        "apikey": `${process.env.DEVTOOLS_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }

  async getSuiAPY() {
    const response = await this.post(
      `/`,
      this.getRequestContent({
        id: 1,
        jsonrpc: "2.0",
        method: "suix_getValidatorsApy",
        params: [],
      }),
    );

    const apyObj = response.result.apys.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (apyItem: any) => apyItem.address === validatorAddress,
    );

    if (!apyObj) {
      return {
        status: "error",
      };
    }

    return {
      status: "ok",
      data: {
        APY: apyObj.apy,
      },
    };
  }

  async getSuiBondedToken() {
    const [response, coinData] = await Promise.all([
      this.post(
        `/`,
        this.getRequestContent({
          id: 1,
          jsonrpc: "2.0",
          // This is the same method used by the official explorer
          method: "suix_getLatestSuiSystemState",
          params: [],
        }),
      ),
      this.post(
        `/`,
        this.getRequestContent({
          id: 1,
          jsonrpc: "2.0",
          method: "suix_getCoinMetadata",
          params: ["0x2::sui::SUI"],
        }),
      ),
    ]);

    const validator = response.result.activeValidators.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v: any) => v.suiAddress === validatorAddress,
    );

    const decimals = coinData?.result?.decimals;
    const stakingPoolSuiBalance = validator?.stakingPoolSuiBalance;

    if (!decimals || !stakingPoolSuiBalance) {
      return {
        status: "error",
      };
    }

    // https://github.com/MystenLabs/sui/blob/cdcfa76c4304caff2496e7b9ba535086704585d5/apps/explorer/src/components/validator/ValidatorStats.tsx#L31
    const bondedToken = validator?.stakingPoolSuiBalance / 10 ** decimals;

    return {
      status: "ok",
      data: {
        bondedToken,
      },
    };
  }
}
