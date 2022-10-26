// A map of functions which return data for the schema.
export const resolvers = {
    Query: {
      cosmosUsersCount: async (_: any, __: any, context: any) => {
        return context.dataSources.CosmosAPI.getAllCosmosUsers();
      },
}};