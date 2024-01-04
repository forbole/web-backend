import type { ContextValue, Response } from "../types";

const commonHandler = (response: Response) => {
  const { data, status } = response;

  if (status === "error") {
    console.log(response.error);

    return;
  }

  return data.result;
};

export const resolvers = {
  Query: {
    allCosmosTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        await dataSources.cosmosAPI.getAllCosmosTVL(),
      );

      if (!result) return;

      return result.map((res) => ({ cosmosTVL: res.value[1] }));
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
    eachCosmosAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosAPY()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        APY: res.value[1],
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
      }));
    },
    eachCosmosBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        bondedToken: res.value[1],
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
      }));
    },
    eachCosmosCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        commissionRate: res.value[1],
        metric: {
          chain_id: res.metric.chain_id,
          instance: res.metric.chain,
          validator_address: res.metric.validator_address,
        },
      }));
    },
    eachCosmosInflationRate: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.cosmosAPI.getEachCosmosInflationRate()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        inflationRate: res.value[1],
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
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
    elrondAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondAPY()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        APY: Number(res.value[1]) * 100,
        metric: {
          instance: "elrond",
          validator_address: res.metric.provider_address,
        },
      }));
    },
    elrondBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondBondedToken()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        bondedToken: res.value[1],
        metric: {
          instance: "elrond",
          validator_address: res.metric.provider_address,
        },
      }));
    },
    elrondCirculatingSupply: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondCirculatingSupply()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        circulatingSupply: res.value[1],
        metric: { instance: "elrond" },
      }));
    },
    elrondCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.elrondAPI.getElrondCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        commissionRate: res.value[1],
        metric: {
          instance: "elrond",
          validator_address: res.metric.provider_address,
        },
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
    elrondUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.elrondAPI.getElrondUnbondingTime();

      return {
        metric: { instance: "elrond" },
        unbondingTime: `${response} days`,
      };
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
    oasisBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = await dataSources.oasisAPI.getOasisBondedToken();

      if (!result) return;

      return result.map((res) => ({
        bondedToken: res.value,
        metric: { instance: "oasis", validator_address: res.metric.identity },
      }));
    },
    oasisCommission: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = commonHandler(
        (await dataSources.oasisAPI.getOasisCommission()) as Response,
      );

      if (!result) return;

      return result.map((res) => ({
        commissionRate: res.value[1],
        metric: { instance: "oasis", validator_address: res.metric.identity },
      }));
    },
    oasisTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = await dataSources.oasisAPI.getOasisTVL();

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis" },
        TVL: res.value,
      }));
    },
    oasisUsers: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;

      const result = await dataSources.oasisAPI.getOasisUsers();

      if (!result) return;

      return result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        usersCount: res.value,
      }));
    },
    radixAPY: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const { data, status } = await dataSources.radixAPI.getRadixAPY();

      if (status === "error" || !data) return;

      const { address, APY } = data;

      return [
        {
          APY,
          metric: { instance: "radix", validator_address: address },
        },
      ];
    },
    radixBondedToken: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const { data, status } = await dataSources.radixAPI.getRadixBondedToken();

      if (status === "error" || !data) return;

      const { address, bondedToken } = data;

      return [
        {
          bondedToken,
          metric: { instance: "radix", validator_address: address },
        },
      ];
    },
    radixTVL: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const { data, status } = await dataSources.radixAPI.getRadixTVL();

      if (status === "error" || !data) return;

      const { address, TVL } = data;

      return [
        {
          metric: { instance: "radix", validator_address: address },
          TVL,
        },
      ];
    },
    radixUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const unbondingTime = await dataSources.radixAPI.getRadixUnbondingTime();

      return { metric: { instance: "radix" }, unbondingTime };
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

        return { bondedToken, validator_address };
      });

      return {
        bondedToken,
        metric: { instance: "solana", validator_address },
      };
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

        return { commissionRate, validator_address };
      });

      return {
        commissionRate,
        metric: { instance: "solana", validator_address },
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

      return { metric: { instance: "solana", validator_address }, TVL };
    },
    solanaUnbondingTime: async (...params: unknown[]) => {
      const { dataSources } = params[2] as ContextValue;
      const response = await dataSources.solanaAPI.getSolanaUnbondingTime();

      return {
        metric: { instance: "solana" },
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

        return { usersCount, validator_address };
      });

      return {
        metric: { instance: "solana", validator_address },
        usersCount,
      };
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
