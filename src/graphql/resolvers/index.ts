import type { ContextValue } from "../types";

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    cosmosUsersCount: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getAllCosmosUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({ usersCount: res.value[1] }));
    },
    allCosmosTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getAllCosmosTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({ cosmosTVL: res.value[1] }));
    },
    eachCosmosTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosChainTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
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
      const response = await dataSources.cosmosAPI.getEachCosmosBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        bondedToken: res.value[1],
      }));
    },
    eachCosmosCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
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
      const response = await dataSources.cosmosAPI.getEachCosmosUnbondingTime();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        unbondingTime: `${Math.floor(res.value[1] / 86400)} days`,
      }));
    },
    eachCosmosAPY: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosAPY();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        APY: res.value[1],
      }));
    },
    eachCosmosTokenSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosTokenSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        supply: res.value[1],
      }));
    },
    eachCosmosInflationRate: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosInflationRate();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        inflationRate: res.value[1],
      }));
    },
    allRadixStakedTokens: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixPromAPI.getStakedRadix();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        bondedToken: res.value[1],
      }));
    },
    allRadixTotalSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixAPI.getTotalRadixSupply();
      const { token } = response;
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
      const response = await dataSources.radixAPI.getRadixUnbondingTime();

      return { metric: { instance: "radix" }, unbondingTime: response };
    },
    elrondAPY: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondAPY();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        APY: res.value[1] * 100,
      }));
    },
    elrondTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "elrond" },
        TVL: res.value[1],
      }));
    },
    elrondCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
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
      const response = await dataSources.elrondAPI.getElrondBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
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
      const response = await dataSources.elrondAPI.getElrondTotalSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "elrond" },
        totalSupply: res.value[1],
      }));
    },
    elrondCirculatingSupply: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondCirculatingSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "elrond" },
        circulatingSupply: res.value[1],
      }));
    },
    elrondUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
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
      const response = await dataSources.solanaAPI.getSolanaUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let usersCount = 0;
      result.map((res: any, i: number) => {
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
      const response = await dataSources.solanaAPI.getStakedSolana();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let bondedToken = 0;
      result.map((res: any, i: number) => {
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
      const response = await dataSources.solanaAPI.getSolanaTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let TVL = 0;
      result.map((res: any, i: number) => {
        TVL += parseInt(res.value[1]);
        if (i === 1) ({ validator_address } = res.metric);

        return { validator_address, TVL };
      });

      return { metric: { validator_address, instance: "solana" }, TVL };
    },
    solanaCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.solanaAPI.getSolanaCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let commissionRate = 0;
      result.map((res: any, i: number) => {
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
      const response = await dataSources.oasisAPI.getOasisUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        usersCount: res.value[1],
      }));
    },
    oasisBondedToken: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.oasisAPI.getOasisBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        bondedToken: res.value[1],
      }));
    },
    oasisCommission: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.oasisAPI.getOasisCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        commissionRate: res.value[1],
      }));
    },
    oasisTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.oasisAPI.getOasisTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "oasis" },
        TVL: res.value[1],
      }));
    },
    radixTVL: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixPromAPI.getRadixTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        TVL: res.value[1],
      }));
    },
    radixUsers: async (
      _: unknown,
      __: unknown,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixPromAPI.getRadixUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;

      return result.map((res: any) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        usersCount: res.value[1],
      }));
    },
  },
};
