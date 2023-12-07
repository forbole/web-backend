import type { DataSourceConfig } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";

import { CoinGeckoDataSource } from "../utils/coingecko-data";

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

const validatorAddress =
  "validator_rdx1swkmn6yvrqjzpaytvug5fp0gzfy9zdzq7j7nlxe8wgjpg76vdcma8p";

// https://dashboard.radixdlt.com/network-staking
// https://radix-babylon-gateway-api.redoc.ly/#tag/Status

export class RadixAPI extends RESTDataSource {
  override baseURL = `${(RADIX_URL as string).replace(/\/$/, "")}/`;
  private baseGatewayURL = "https://mainnet-gateway.radixdlt.com/";
  private gecko: CoinGeckoDataSource;

  constructor(options: DataSourceConfig) {
    super(options);

    this.gecko = new CoinGeckoDataSource(options);
  }

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

  async getRadixTVL() {
    const [radixResponse, coinPrice] = await Promise.all([
      this.post(`${this.baseGatewayURL}state/validators/list`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network_identifier: {
            network: "mainnet",
          },
          validator_identifier: {
            address: validatorAddress,
          },
        }),
      }),
      this.gecko.getCoinPrice("radix"),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validator = radixResponse.validators.items.find((i: any) =>
      (i.address as string).includes(validatorAddress),
    );

    if (!validator) {
      return {
        status: "error",
      };
    }

    const lockedUnit = validator.locked_owner_stake_unit_vault.balance;
    const TVL = lockedUnit * Number(coinPrice);

    if (Number.isNaN(TVL)) {
      return {
        status: "error",
      };
    }

    return {
      status: "ok",
      data: {
        TVL,
        address: validatorAddress,
      },
    };
  }

  async getRadixUnbondingTime() {
    const unbondingTime = "1-3 weeks (500 epochs)";

    return unbondingTime;
  }
}
