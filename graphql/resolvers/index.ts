// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    cosmosUsersCount: async (_: any, __: any, { dataSources }: any) => {
        const response = await dataSources.cosmosAPI.getAllCosmosUsers();
        const { status, data } = response
        if (status === "error") return console.log(response.error)
        const { result } = data
        const val = result.map((res) => ({usersCount: res.value[1]}))
        return val;
    },
    allCosmosTVL: async (_:any, __:any, {dataSources}: any) => {
      const response = await dataSources.cosmosAPI.getAllCosmosTVL();
        const { status, data } = response
        if (status === "error") return console.log(response.error)
        const { result } = data
        const val = result.map((res) => ({cosmosTVL: res.value[1]}))
        return val;
    },
    eachCosmosTVL: async (_: any, __: any, { dataSources }: any) => {
        const response = await dataSources.cosmosAPI.getEachCosmosChainTVL();
        const { status, data } = response
        if (status === "error") return console.log(response.error)
        const { result } = data
        const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, denom: res.metric.denom, instance: res.metric.instance, validator_address: res.metric.validator_address}, TVL: res.value[1]}))
        return val;
    },
    eachCosmosBondedToken: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosBondedToken();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance}, bondedToken: res.value[1]}))
      return val;
    },
    eachCosmosCommission: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosCommission();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance, validator_address: res.metric.validator_address}, commissionRate: res.value[1]}))
      return val;
    },
    eachCosmosUnbondingTime: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosUnbondingTime();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance}, unbondingTime: `${Math.floor(res.value[1] / 86400)} days`}))
      return val;
    },
    eachCosmosAPY: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosAPY();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance}, APY: res.value[1]}))
      return val;
    },
    eachCosmosTokenSupply: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosTokenSupply();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance}, supply: res.value[1]}))
      return val;
    },
    eachCosmosInflationRate: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.cosmosAPI.getEachCosmosInflationRate();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {chain_id: res.metric.chain_id, instance: res.metric.instance}, inflationRate: res.value[1]}))
      return val;
    },
    allRadixStakedTokens: async (_:any, __:any, { dataSources }: any) => {
      const JSONbody = {
        'network_identifier': {
            'network': 'mainnet'
        },
        'validator_identifier': {
            'address': 'rv1qtkl4r2x86cn5nujyx7cnd6rup5tkuvvm7qqp0ycxa6fgv246k6d6nrq0kz'
        }
      }
      const response = await dataSources.radixAPI.getStakedRadix(JSONbody);
      const { validator } = response
      const {validator_identifier, stake} = validator
      const val = {metric: {validator_address: validator_identifier?.address, instance: 'radix'}, bondedToken: stake?.value}
      return val;
    },
    allRadixTotalSupply: async (_:any, __:any, { dataSources }: any) => {
      const JSONbody = {
        'network_identifier': {
            'network': 'mainnet'
        }
      }
      const response = await dataSources.radixAPI.getTotalRadixSupply(JSONbody);
      const { token } = response
      const { token_supply } = token
      const val = {metric: {instance: 'radix'}, supply: token_supply?.value}
      return val;
    },
    elrondAPY: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondAPY();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {validator_address: res.metric.provider_address, instance: "elrond"}, APY: res.value[1] * 100}))
      return val;
    },
    elrondTVL: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondTVL();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {instance: "elrond"}, TVL: res.value[1]}))
      return val
    },
    elrondCommission: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondCommission();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {validator_address: res.metric.provider_address, instance: "elrond"}, commissionRate: res.value[1]}))
      return val;
    },
    elrondBondedToken: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondBondedToken();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {validator_address: res.metric.provider_address, instance: "elrond"}, bondedToken: res.value[1]}))
      return val;
    },
    elrondTotalSupply: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondTotalSupply();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {instance: "elrond"}, totalSupply: res.value[1]}))
      return val;
    },
    elrondCirculatingSupply: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondCirculatingSupply();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {instance: "elrond"}, circulatingSupply: res.value[1]}))
      return val;
    },
    elrondUsers: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondUsers();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      const val = result.map((res) => ({metric: {instance: "elrond"}, usersCount: res.value[1]}))
      return val;
    },
    elrondUnbondingTime: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.elrondAPI.getElrondUnbondingTime();
      const val = {metric: {instance: "elrond"}, unbondingTime: `${response} days`}
      return val;
    },
    solanaUsers: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.solanaAPI.getSolanaUsers();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      let validator_address = ""
      let usersCount = 0
      result.map((res, i) => {
        usersCount += parseInt(res.value[1]); 
        if (i === 1) validator_address = res.metric.validator_address; 
        return ({validator_address, usersCount})
      })
      const val = { metric: {validator_address, instance: "solana"}, usersCount}
      return val;
    },
    solanaBondedToken: async (_:any, __:any, { dataSources }: any) => {
      const response = await dataSources.solanaAPI.getStakedSolana();
      const { status, data } = response
      if (status === "error") return console.log(response.error)
      const { result } = data
      let validator_address = ""
      let bondedToken = 0
      result.map((res, i) => {
        bondedToken += parseInt(res.value[1]); 
        if (i === 1) validator_address = res.metric.validator_address; 
        return ({validator_address, bondedToken})
      })
      const val = { metric: {validator_address, instance: "solana"}, bondedToken}
      return val;
    }
}};