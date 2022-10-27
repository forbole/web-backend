import { GraphQLScalarType, Kind } from 'graphql';

// The GraphQL schema
export const typeDefs = `#graphql
  scalar Date

  type Query {
    cosmosUsersCount: [UsersCountResult]
    eachCosmosTVL: [EachCosmosTVLResult]
    allCosmosTVL: [CosmosTVLResult]
    eachCosmosBondedToken: [EachCosmosBondedTokenResult]
    eachCosmosCommission: [EachCosmosCommissionResult]
    eachCosmosUnbondingTime: [EachCosmosUnbondingTimeResult]
  }

  type UsersCountResult {
    usersCount: String
  }

  type CosmosTVLResult {
    cosmosTVL: String
  }

  type EachCosmosTVLResult {
    metric: TVLMetric
    TVL: String
  }

  type TVLMetric {
    chain_id: String
    denom: String
    instance: String
    validator_address: String
  }

  type EachCosmosBondedTokenResult {
    metric: BondedTokenMetric
    bondedToken: String
  }

  type BondedTokenMetric {
    chain_id: String
    instance: String
  }

  type EachCosmosCommissionResult {
    metric: EachCosmosCommissionMetric
    commissionRate: String
  }

  type EachCosmosCommissionMetric {
    chain_id: String
    instance: String
    validator_address: String
  }

  type EachCosmosUnbondingTimeResult {
    metric: EachCosmosUnbondingTimeMetric
    unbondingTime: String
  }

  type EachCosmosUnbondingTimeMetric {
    chain_id: String
    instance: String
  }
`;

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: number) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

// module.exports = typeDefs;