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
    eachCosmosInflationRate: [EachCosmosInflationRateResult]
    allRadixStakedTokens: RadixStakedTokensResult
    allRadixTotalSupply: RadixTokenSupplyResult
    elrondAPY: [ElrondAPYResult]
    elrondTVL: [ElrondTVLResult]
    elrondCommission: [ElrondCommissionResult]
    elrondBondedToken: [ElrondBondedTokenResult]
    elrondTotalSupply: [ElrondTotalSupplyResult]
    elrondCirculatingSupply: [ElrondCirculatingSupplyResult]
    elrondUsers: [ElrondUsersResult]
    elrondUnbondingTime: ElrondUnbondingTimeResult
    solanaUsers: SolanaUsersResult
    solanaBondedToken: SolanaBondedTokenResult
    solanaTVL: SolanaTVLResult
    solanaCommission: SolanaCommissionResult
    solanaUnbondingTime: SolanaUnbondingTimeResult
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
    metric: ChainIdAndInstanceMetric
    bondedToken: String
  }

  type ChainIdAndInstanceMetric {
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
    metric: ChainIdAndInstanceMetric
    unbondingTime: String
  }

  type EachCosmosAPYResult {
    metric: ChainIdAndInstanceMetric
    APY: String
  }

  type EachCosmosTokenSupplyResult {
    metric: ChainIdAndInstanceMetric
    supply: String
  }

  type EachCosmosInflationRateResult {
    metric: ChainIdAndInstanceMetric
    inflationRate: String 
  }

  type RadixStakedTokensResult {
    metric: AddressAndInstanceMetric
    bondedToken: String
  }

  type AddressAndInstanceMetric {
    validator_address: String
    instance: String
  }

  type RadixTokenSupplyResult {
    metric: InstanceOnlyMetric
    supply: String
  }

  type InstanceOnlyMetric {
    instance: String
  }

  type ElrondAPYResult {
    metric: AddressAndInstanceMetric
    APY: String
  }

  type ElrondTVLResult {
    metric: InstanceOnlyMetric
    TVL: String
  }

  type ElrondCommissionResult {
    metric: AddressAndInstanceMetric
    commissionRate: String
  }

  type ElrondBondedTokenResult {
    metric: AddressAndInstanceMetric
    bondedToken: String
  }

  type ElrondTotalSupplyResult {
    metric: InstanceOnlyMetric
    totalSupply: String
  }

  type ElrondCirculatingSupplyResult {
    metric: InstanceOnlyMetric
    circulatingSupply: String
  }

  type ElrondUsersResult {
    metric: InstanceOnlyMetric
    usersCount: String
  }

  type ElrondUnbondingTimeResult {
    metric: InstanceOnlyMetric
    unbondingTime: String
  }

  type SolanaUsersResult {
    metric: AddressAndInstanceMetric
    usersCount: String
  }

  type SolanaBondedTokenResult {
    metric: AddressAndInstanceMetric
    bondedToken: String
  }

  type SolanaTVLResult {
    metric: AddressAndInstanceMetric
    TVL: String
  }

  type SolanaCommissionResult {
    metric: AddressAndInstanceMetric
    commissionRate: String
  }

  type SolanaUnbondingTimeResult {
    metric: InstanceOnlyMetric
    unbondingTime: String
  }

`;