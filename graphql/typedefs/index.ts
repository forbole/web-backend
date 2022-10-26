// The GraphQL schema
export const typeDefs = `#graphql
  type Query {
    cosmosUsersCount: UserData
  }
  type UserData {
    status: String
    data: Data
  }
  type Data {
    result: [Result]
  }
  type Result {
    metric: String
    value: [String]
  }
`;

// module.exports = typeDefs;