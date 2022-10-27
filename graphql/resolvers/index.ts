// A map of functions which return data for the schema.
export const resolvers = {
  Query: {
    cosmosUsersCount: async (_: any, __: any, { dataSources }: any) => {
        const response = await dataSources.cosmosAPI.getAllCosmosUsers();
        // console.log('result', response.data.result)
        const { status, data } = response
        if (status === "error") return console.log(response.error)
        const { result } = data
        // console.log('res', result.map((x) => x.value))
        // const val = result.map((res) => ({date: new Date(res.value[0] * 1e3).toLocaleDateString("en-US"), usersCount: res.value[1]}))
        const val = result.map((res) => ({usersCount: res.value[1]}))
        // return dataSources.cosmosAPI.getAllCosmosUsers();
        // console.log('val', val)
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
}};