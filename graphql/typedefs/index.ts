// The GraphQL schema
export const typeDefs = `#graphql

  type Query {
    cosmosUsersCount: [UsersCountResult]
    eachCosmosTVL: [EachCosmosTVLResult]
    allCosmosTVL: [CosmosTVLResult]
    eachCosmosBondedToken: [EachCosmosBondedTokenResult]
    eachCosmosCommission: [EachCosmosCommissionResult]
    eachCosmosUnbondingTime: [EachCosmosUnbondingTimeResult]
    eachCosmosAPY: [EachCosmosAPYResult]
    eachCosmosTokenSupply: [EachCosmosTokenSupplyResult]
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

  type EachCosmosAPYResult {
    metric: EachCosmosAPYMetric
    APY: String
  }

  type EachCosmosAPYMetric {
    chain_id: String
    instance: String
  }

  type EachCosmosTokenSupplyResult {
    metric: EachCosmosAPYMetric
    supply: String
  }
`;