import type { DataSourceConfig } from "@apollo/datasource-rest";
import { RESTDataSource } from "@apollo/datasource-rest";

import { radixValidatorAddress } from "../utils/addresses";
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

class GatewayDataSource extends RESTDataSource {
  override baseURL = "https://mainnet-gateway.radixdlt.com/";
  getValidator() {
    return this.post(`state/validators/list`, {
      body: JSON.stringify({
        network_identifier: {
          network: "mainnet",
        },
        validator_identifier: {
          address: radixValidatorAddress,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// https://dashboard.radixdlt.com/network-staking
// https://radix-babylon-gateway-api.redoc.ly/#tag/Status

export class RadixAPI extends RESTDataSource {
  override baseURL = `${(RADIX_URL as string).replace(/\/$/, "")}/`;
  private gateway: GatewayDataSource;
  private gecko: CoinGeckoDataSource;

  constructor(options: DataSourceConfig) {
    super(options);

    this.gecko = new CoinGeckoDataSource(options);
    this.gateway = new GatewayDataSource(options);
  }

  async getRadixAPY() {
    // https://dashboard.radixdlt.com/network-staking/validator_rdx1swkmn6yvrqjzpaytvug5fp0gzfy9zdzq7j7nlxe8wgjpg76vdcma8p
    // @hardcoded
    const APY = 0.0783;

    return {
      data: {
        address: radixValidatorAddress,
        APY,
      },
      status: "ok",
    };
  }

  async getRadixBondedToken() {
    const radixResponse = await this.gateway.getValidator();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validator = radixResponse.validators.items.find((i: any) =>
      (i.address as string).includes(radixValidatorAddress),
    );

    if (!validator) {
      return {
        status: "error",
      };
    }

    const bondedToken = validator.active_in_epoch.stake;

    return {
      data: {
        address: radixValidatorAddress,
        bondedToken,
      },
      status: "ok",
    };
  }

  async getRadixTVL() {
    // @hardcoded
    const tokens = 57_164_450.3;
    const coinPrice = await this.gecko.getCoinPrice("radix");

    const TVL = tokens * Number(coinPrice);

    if (Number.isNaN(TVL)) {
      return {
        status: "error",
      };
    }

    return {
      data: {
        address: radixValidatorAddress,
        TVL,
      },
      status: "ok",
    };
  }

  async getRadixUnbondingTime() {
    const unbondingTime = "1-3 weeks (500 epochs)";

    return unbondingTime;
  }

  async getTotalRadixSupply(): Promise<RadixResponse> {
    return this.post("token/native", {
      body: JSON.stringify({
        network_identifier: {
          network: "mainnet",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
