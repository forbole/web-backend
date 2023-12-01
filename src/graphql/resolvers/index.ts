import type { ContextValue, Response } from "../types";

const commonHandler = (response: Response) => {
  const { status, data } = response;

  if (status === "error") {
    console.log(response.error);

    return;
  }

  return data.result;
};

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    archwayBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.archwayAPI.getArchwayBondenToken();

      if (response.status === "error") return;

      return response.data;
    },
    cosmosUsersCount: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        await dataSources.cosmosAPI.getAllCosmosUsers(),
      );

      if (!result) return;

      return result.map((res) => ({
        usersCount: res.value[1],
      }));
    },
    allCosmosTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        await dataSources.cosmosAPI.getAllCosmosTVL(),
      );

      if (!result) return;

      return result.map((res) => ({ cosmosTVL: res.value[1] }));
    },
    eachCosmosTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosChainTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: {
          chain_id: res.metric.chain_id,
          denom: res.metric.denom,
          instance: res.metric.chain,
          validator_address: res.metric.validator_address,
        },
        TVL: res.value[1],
      }));
    },
    eachCosmosBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        bondedToken: res.value[1],
      }));
    },
    eachCosmosCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: {
          chain_id: res.metric.chain_id,
          instance: res.metric.chain,
          validator_address: res.metric.validator_address,
        },
        commissionRate: res.value[1],
      }));
    },
    eachCosmosUnbondingTime: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosUnbondingTime()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        unbondingTime: `${Math.floor(Number(res.value[1]) / 86400)} days`,
      }));
    },
    eachCosmosAPY: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosAPY()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        APY: res.value[1],
      }));
    },
    eachCosmosTokenSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosTokenSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        supply: res.value[1],
      }));
    },
    eachCosmosInflationRate: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosInflationRate()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        inflationRate: res.value[1],
      }));
    },
    allRadixStakedTokens: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.radixPromAPI.getStakedRadix()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        bondedToken: res.value[1],
      }));
    },
    allRadixTotalSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = await dataSources.radixAPI.getTotalRadixSupply();

      const { token } = result;
      const { token_supply } = token;

      return {
        metric: { instance: "radix" },
        supply: token_supply?.value,
      };
    },
    radixUnbondingTime: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const unbondingTime = await dataSources.radixAPI.getRadixUnbondingTime();

      return { metric: { instance: "radix" }, unbondingTime };
    },
    elrondAPY: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondAPY()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        APY: Number(res.value[1]) * 100,
      }));
    },
    elrondTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        TVL: res.value[1],
      }));
    },
    elrondCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        commissionRate: res.value[1],
      }));
    },
    elrondBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        bondedToken: res.value[1],
      }));
    },
    elrondTotalSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondTotalSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        totalSupply: res.value[1],
      }));
    },
    elrondCirculatingSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondCirculatingSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        circulatingSupply: res.value[1],
      }));
    },
    elrondUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        usersCount: res.value[1],
      }));
    },
    elrondUnbondingTime: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondUnbondingTime();

      return {
        metric: { instance: "elrond" },
        unbondingTime: `${response} days`,
      };
    },
    solanaUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.solanaAPI.getSolanaUsers()) as Response,
      );

      if (!result) return;

      let validator_address: string | undefined = "";
      let usersCount = 0;

      result.map((res, i: number) => {
        usersCount += parseInt(res.value[1]);
        if (i === 1) ({ validator_address } = res.metric);

        return { validator_address, usersCount };
      });

      return {
        metric: { validator_address, instance: "solana" },
        usersCount,
      };
    },
    solanaBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.solanaAPI.getStakedSolana()) as Response,
      );
      let validator_address: string | undefined = "";
      let bondedToken = 0;
      if (!result) return;

      result.map((res, i: number) => {
        bondedToken += parseInt(res.value[1]);
        if (i === 1) ({ validator_address } = res.metric);

        return { validator_address, bondedToken };
      });

      return {
        metric: { validator_address, instance: "solana" },
        bondedToken,
      };
    },
    solanaTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.solanaAPI.getSolanaTVL()) as Response,
      );

      if (!result) return;

      let validator_address: string | undefined = "";
      let TVL = 0;
      result.forEach((res, i: number) => {
        TVL += parseInt(res.value[1]);
        if (i === 1) ({ validator_address } = res.metric);
      });

      return { metric: { validator_address, instance: "solana" }, TVL };
    },
    solanaCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.solanaAPI.getSolanaCommission()) as Response,
      );

      if (!result) return;

      let validator_address: string | undefined = "";
      let commissionRate = 0;

      result.map((res, i: number) => {
        if (i === 1) {
          commissionRate = parseInt(res.value[1]) / 100;
          ({ validator_address } = res.metric);
        }

        return { validator_address, commissionRate };
      });

      return {
        metric: { validator_address, instance: "solana" },
        commissionRate,
      };
    },
    solanaUnbondingTime: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.solanaAPI.getSolanaUnbondingTime();

      return {
        metric: { instance: "solana" },
        unbondingTime: `${response} days`,
      };
    },
    oasisUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        usersCount: res.value[1],
      }));
    },
    oasisBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        bondedToken: res.value[1],
      }));
    },
    oasisCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        commissionRate: res.value[1],
      }));
    },
    oasisTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis" },
        TVL: res.value[1],
      }));
    },
    radixTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.radixPromAPI.getRadixTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        TVL: res.value[1],
      }));
    },
    radixUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const result = commonHandler(
        (await dataSources.radixPromAPI.getRadixUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        usersCount: res.value[1],
      }));
    },
    suiAPY: async (_: unknown, __: unknown, { dataSources }: ContextValue) => {
      const response = await dataSources.suiAPI.getSuiAPY();

      if (response.status === "error") return;

      return response.data;
    },
    suiBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.suiAPI.getSuiBondedToken();

      if (response.status === "error") return;

      return response.data;
    },
  },
};
