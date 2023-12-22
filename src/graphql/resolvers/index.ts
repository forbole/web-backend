import type { ContextValue, Response } from "../types";

const commonHandler = (response: Response) => {
  const { status, data } = response;

  if (status === "error") {
    console.log(response.error);

    return;
  }

  return data.result;
};

export const resolvers = {
  Query: {
    archwayAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.archwayAPI.getAPY();

      if (response.status === "error") return;

      return response.data;
    },
    archwayBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.archwayAPI.getBondedToken();

      if (response.status === "error") return;

      return response.data;
    },
    archwayTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.archwayAPI.getTVL();

      if (response.status === "error") return;

      return response.data;
    },
    cosmosUsersCount: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        await dataSources.cosmosAPI.getAllCosmosUsers(),
      );

      if (!result) return;

      return result.map((res) => ({
        usersCount: res.value[1],
      }));
    },
    allCosmosTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        await dataSources.cosmosAPI.getAllCosmosTVL(),
      );

      if (!result) return;

      return result.map((res) => ({ cosmosTVL: res.value[1] }));
    },
    eachCosmosTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    eachCosmosBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        bondedToken: res.value[1],
      }));
    },
    eachCosmosCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    eachCosmosUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosUnbondingTime()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        unbondingTime: `${Math.floor(Number(res.value[1]) / 86400)} days`,
      }));
    },
    eachCosmosAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosAPY()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        APY: res.value[1],
      }));
    },
    eachCosmosTokenSupply: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosTokenSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        supply: res.value[1],
      }));
    },
    eachCosmosInflationRate: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosInflationRate()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        inflationRate: res.value[1],
      }));
    },
    allRadixStakedTokens: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.radixPromAPI.getStakedRadix()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        bondedToken: res.value[1],
      }));
    },
    allRadixTotalSupply: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const result = await dataSources.radixAPI.getTotalRadixSupply();

      const { token } = result;
      const { token_supply } = token;

      return {
        metric: { instance: "radix" },
        supply: token_supply?.value,
      };
    },
    radixUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const unbondingTime = await dataSources.radixAPI.getRadixUnbondingTime();

      return { metric: { instance: "radix" }, unbondingTime };
    },
    elrondAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    elrondTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        TVL: res.value[1],
      }));
    },
    elrondCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    elrondBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    elrondTotalSupply: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondTotalSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        totalSupply: res.value[1],
      }));
    },
    elrondCirculatingSupply: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondCirculatingSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        circulatingSupply: res.value[1],
      }));
    },
    elrondUsers: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "elrond" },
        usersCount: res.value[1],
      }));
    },
    elrondUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.elrondAPI.getElrondUnbondingTime();

      return {
        metric: { instance: "elrond" },
        unbondingTime: `${response} days`,
      };
    },
    solanaUsers: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    solanaBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    solanaTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    solanaCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

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
    solanaUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.solanaAPI.getSolanaUnbondingTime();

      return {
        metric: { instance: "solana" },
        unbondingTime: `${response} days`,
      };
    },
    oasisUsers: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        usersCount: res.value[1],
      }));
    },
    oasisBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        bondedToken: res.value[1],
      }));
    },
    oasisCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        commissionRate: res.value[1],
      }));
    },
    oasisTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisTVL()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis" },
        TVL: res.value[1],
      }));
    },
    radixTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const { status, data } = await dataSources.radixAPI.getRadixTVL();

      if (status === "error" || !data) return;

      const { address, TVL } = data;

      return [
        {
          metric: { instance: "radix", validator_address: address },
          TVL,
        },
      ];
    },
    radixUsers: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.radixPromAPI.getRadixUsers()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        usersCount: res.value[1],
      }));
    },
    suiAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.suiAPI.getAPY();

      if (response.status === "error") return;

      return response.data;
    },
    suiBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.suiAPI.getBondedToken();

      if (response.status === "error") return;

      return response.data;
    },
    suiTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.suiAPI.getTVL();

      if (response.status === "error") return;

      return response.data;
    },
  },
};
