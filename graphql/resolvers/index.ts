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
        const val = result.map((res) => ({date: new Date(res.value[0] * 1e3).toLocaleDateString("en-US"), usersCount: res.value[1]}))
        // return dataSources.cosmosAPI.getAllCosmosUsers();
        // console.log('val', val)
        return val;
       
      },
}};