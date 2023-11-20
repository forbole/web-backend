import type { ContextValue } from "../types";

// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    cosmosUsersCount: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getAllCosmosUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({ usersCount: res.value[1] }));
      return val;
    },
    allCosmosTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.cosmosAPI.getAllCosmosTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({ cosmosTVL: res.value[1] }));
      return val;
    },
    eachCosmosTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.cosmosAPI.getEachCosmosChainTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: {
          chain_id: res.metric.chain_id,
          denom: res.metric.denom,
          instance: res.metric.chain,
          validator_address: res.metric.validator_address,
        },
        TVL: res.value[1],
      }));
      return val;
    },
    eachCosmosBondedToken: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        bondedToken: res.value[1],
      }));
      return val;
    },
    eachCosmosCommission: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: {
          chain_id: res.metric.chain_id,
          instance: res.metric.chain,
          validator_address: res.metric.validator_address,
        },
        commissionRate: res.value[1],
      }));
      return val;
    },
    eachCosmosUnbondingTime: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosUnbondingTime();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        unbondingTime: `${Math.floor(res.value[1] / 86400)} days`,
      }));
      return val;
    },
    eachCosmosAPY: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.cosmosAPI.getEachCosmosAPY();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        APY: res.value[1],
      }));
      return val;
    },
    eachCosmosTokenSupply: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosTokenSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        supply: res.value[1],
      }));
      return val;
    },
    eachCosmosInflationRate: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.cosmosAPI.getEachCosmosInflationRate();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { chain_id: res.metric.chain_id, instance: res.metric.chain },
        inflationRate: res.value[1],
      }));
      return val;
    },
    allRadixStakedTokens: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixPromAPI.getStakedRadix();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        bondedToken: res.value[1],
      }));
      return val;
    },
    allRadixTotalSupply: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const JSONbody = {
        network_identifier: {
          network: "mainnet",
        },
      };
      const response = await dataSources.radixAPI.getTotalRadixSupply(JSONbody);
      const { token } = response;
      const { token_supply } = token;
      const val = {
        metric: { instance: "radix" },
        supply: token_supply?.value,
      };
      return val;
    },
    radixUnbondingTime: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.radixAPI.getRadixUnbondingTime();
      const val = { metric: { instance: "radix" }, unbondingTime: response };
      return val;
    },
    elrondAPY: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.elrondAPI.getElrondAPY();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        APY: res.value[1] * 100,
      }));
      return val;
    },
    elrondTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.elrondAPI.getElrondTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "elrond" },
        TVL: res.value[1],
      }));
      return val;
    },
    elrondCommission: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        commissionRate: res.value[1],
      }));
      return val;
    },
    elrondBondedToken: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: {
          validator_address: res.metric.provider_address,
          instance: "elrond",
        },
        bondedToken: res.value[1],
      }));
      return val;
    },
    elrondTotalSupply: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondTotalSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "elrond" },
        totalSupply: res.value[1],
      }));
      return val;
    },
    elrondCirculatingSupply: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondCirculatingSupply();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "elrond" },
        circulatingSupply: res.value[1],
      }));
      return val;
    },
    elrondUsers: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.elrondAPI.getElrondUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "elrond" },
        usersCount: res.value[1],
      }));
      return val;
    },
    elrondUnbondingTime: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.elrondAPI.getElrondUnbondingTime();
      const val = {
        metric: { instance: "elrond" },
        unbondingTime: `${response} days`,
      };
      return val;
    },
    solanaUsers: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.solanaAPI.getSolanaUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let usersCount = 0;
      result.map((res, i) => {
        usersCount += parseInt(res.value[1]);
        if (i === 1) validator_address = res.metric.validator_address;
        return { validator_address, usersCount };
      });
      const val = {
        metric: { validator_address, instance: "solana" },
        usersCount,
      };
      return val;
    },
    solanaBondedToken: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.solanaAPI.getStakedSolana();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let bondedToken = 0;
      result.map((res, i) => {
        bondedToken += parseInt(res.value[1]);
        if (i === 1) validator_address = res.metric.validator_address;
        return { validator_address, bondedToken };
      });
      const val = {
        metric: { validator_address, instance: "solana" },
        bondedToken,
      };
      return val;
    },
    solanaTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.solanaAPI.getSolanaTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let TVL = 0;
      result.map((res, i) => {
        TVL += parseInt(res.value[1]);
        if (i === 1) validator_address = res.metric.validator_address;
        return { validator_address, TVL };
      });
      const val = { metric: { validator_address, instance: "solana" }, TVL };
      return val;
    },
    solanaCommission: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.solanaAPI.getSolanaCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      let validator_address = "";
      let commissionRate = 0;
      result.map((res, i) => {
        if (i === 1) {
          commissionRate = parseInt(res.value[1]) / 100;
          validator_address = res.metric.validator_address;
        }
        return { validator_address, commissionRate };
      });
      const val = {
        metric: { validator_address, instance: "solana" },
        commissionRate,
      };
      return val;
    },
    solanaUnbondingTime: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.solanaAPI.getSolanaUnbondingTime();
      const val = {
        metric: { instance: "solana" },
        unbondingTime: `${response} days`,
      };
      return val;
    },
    oasisUsers: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.oasisAPI.getOasisUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        usersCount: res.value[1],
      }));
      return val;
    },
    oasisBondedToken: async (
      _: any,
      __: any,
      { dataSources }: ContextValue,
    ) => {
      const response = await dataSources.oasisAPI.getOasisBondedToken();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        bondedToken: res.value[1],
      }));
      return val;
    },
    oasisCommission: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.oasisAPI.getOasisCommission();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "oasis", validator_address: res.metric.identity },
        commissionRate: res.value[1],
      }));
      return val;
    },
    oasisTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.oasisAPI.getOasisTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "oasis" },
        TVL: res.value[1],
      }));
      return val;
    },
    radixTVL: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.radixPromAPI.getRadixTVL();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        TVL: res.value[1],
      }));
      return val;
    },
    radixUsers: async (_: any, __: any, { dataSources }: ContextValue) => {
      const response = await dataSources.radixPromAPI.getRadixUsers();
      const { status, data } = response;
      if (status === "error") return console.log(response.error);
      const { result } = data;
      const val = result.map((res) => ({
        metric: { instance: "radix", validator_address: res.metric.address },
        usersCount: res.value[1],
      }));
      return val;
    },
  },
};
