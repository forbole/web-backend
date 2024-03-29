// In seconds
const defaultMaxAge = 60 * 60 * 24;

// The GraphQL schema
export const typeDefs = `#graphql
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Query {
    allCosmosTVL: [CosmosTVLResult]
    allRadixTotalSupply: RadixTokenSupplyResult
    archwayAPY: CommonAPYResult
    archwayBondedToken: CommonBondedTokenResult
    archwayTVL: CommonTVLResult
    cosmosUsersCount: [UsersCountResult]
    eachCosmosAPY: [EachCosmosAPYResult]
    eachCosmosBondedToken: [EachCosmosBondedTokenResult]
    eachCosmosCommission: [EachCosmosCommissionResult]
    eachCosmosInflationRate: [EachCosmosInflationRateResult]
    eachCosmosTVL: [EachCosmosTVLResult]
    eachCosmosTokenSupply: [EachCosmosTokenSupplyResult]
    eachCosmosUnbondingTime: [EachCosmosUnbondingTimeResult]
    elrondAPY: [ElrondAPYResult]
    elrondBondedToken: [ElrondBondedTokenResult]
    elrondCirculatingSupply: [ElrondCirculatingSupplyResult]
    elrondCommission: [ElrondCommissionResult]
    elrondTVL: [ElrondTVLResult]
    elrondTotalSupply: [ElrondTotalSupplyResult]
    elrondUnbondingTime: ElrondUnbondingTimeResult
    elrondUsers: [ElrondUsersResult]
    oasisBondedToken: [OasisBondedTokenResult]
    oasisCommission: [OasisCommissionResult]
    oasisTVL: [OasisTVLResult]
    oasisUsers: [OasisUsersResult]
    radixAPY: [RadixAPYResult]
    radixBondedToken: [RadixBondedTokenResult]
    radixTVL: [RadixTVLResult]
    radixUnbondingTime: RadixUnbondingTimeResult
    radixUsers: [RadixUsersResult]
    solanaBondedToken: SolanaBondedTokenResult
    solanaCommission: SolanaCommissionResult
    solanaTVL: SolanaTVLResult
    solanaUnbondingTime: SolanaUnbondingTimeResult
    solanaUsers: SolanaUsersResult
    suiAPY: CommonAPYResult
    suiBondedToken: CommonBondedTokenResult
    suiTVL: CommonTVLResult
  }

  type UsersCountResult {
    usersCount: String
  }

  type CosmosTVLResult {
    cosmosTVL: String
  }

  type EachCosmosTVLResult {
    metric: CosmosTVLMetric
    TVL: String
  }

  type CosmosTVLMetric {
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

  type AddressAndInstanceMetric {
    validator_address: String
    instance: String
  }

  type RadixTokenSupplyResult {
    metric: InstanceOnlyMetric
    supply: String
  }

  type RadixUnbondingTimeResult {
    metric: InstanceOnlyMetric
    unbondingTime: String
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

  type CommonAPYResult @cacheControl(maxAge: ${defaultMaxAge}) {
    APY: String
  }

  type CommonBondedTokenResult @cacheControl(maxAge: ${defaultMaxAge}) {
    bondedToken: String
  }

  type CommonTVLResult @cacheControl(maxAge: ${defaultMaxAge}) {
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

  type OasisUsersResult {
    metric: AddressAndInstanceMetric
    usersCount: String
  }

  type OasisBondedTokenResult {
    metric: AddressAndInstanceMetric
    bondedToken: String
  }

  type OasisCommissionResult {
    metric: AddressAndInstanceMetric
    commissionRate: String
  }

  type OasisTVLResult {
    metric: InstanceOnlyMetric
    TVL: String
  }

  type RadixAPYResult @cacheControl(maxAge: ${defaultMaxAge}) {
    APY: String
    metric: AddressAndInstanceMetric
  }

  type RadixBondedTokenResult @cacheControl(maxAge: ${defaultMaxAge}) {
    bondedToken: String
    metric: AddressAndInstanceMetric
  }

  type RadixTVLResult @cacheControl(maxAge: ${defaultMaxAge}) {
    metric: AddressAndInstanceMetric
    TVL: String
  }

  type RadixUsersResult {
    metric: AddressAndInstanceMetric
    usersCount: String
  }
`;
