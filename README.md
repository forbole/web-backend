# Web backend

Express API server in Node.js that serves up REST API and GraphQL endpoints, handling various **APIs** requests for all frontend apps.

## APIs

### Responses

All the below listed API endpoints return `200` when a request is successful, and various different codes, e.g., `400`, `500` etc., when something wrong happens.

### Contact

#### POST `/contact`

Requesting to send information/e-mails/feedbacks to Forbole e-mail address.

Upon the request is successful, a `200` status will br returned with the success message as below:

```json
{
  "success": "true"
}
```

### Graphql

#### Public Graphql endpoint for data querying:

[An external link to our public GraphQL APIs.](https://api.forbole.com/graphql)

In **non-production** environments, an embedded version of Apollo Sandbox is shown on Apollo Server 4's landing page, served at `http://localhost:4000/graphql`.

[You can find the typedefs here.](src/graphql/typedefs/index.ts)

##### querying of `total no. of users staked to Forbole on all Cosmos SDK chains` on Sandbox:

```graphql
query ExampleQuery {
  cosmosUsersCount {
    usersCount
  }
}
```

#### Example Response:

```json
{
  "data": {
    "cosmosUsersCount": [
      {
        "usersCount": "36517"
      }
    ]
  }
}
```

In **production** environments, when `NODE_ENV` is `production`, users can query data as follows:

#### POST `/graphql`

##### Querying total no. of users staked to Forbole on all Cosmos SDK chains:

```zsh
curl --request POST \
  --header 'content-type: application/json' \
  --url https://api.forbole.com/graphql \
  --data '{"query":"query {cosmosUsersCount{usersCount}}"}'
```

##### Example Response:

```zsh
{"data":{"cosmosUsersCount":[{"usersCount":"36517"}]}}
```

#### All query fields and sample responses:

### Cosmos-SDK

---

9 schemas

##### Cosmos user count

```graphql
query CosmosUsersQuery {
  cosmosUsersCount {
    usersCount
  }
}
```

```json
{
  "data": {
    "cosmosUsersCount": [
      {
        "usersCount": "46851"
      }
    ]
  }
}
```

##### TVL on each Cosmos SDK chain

```graphql
query CosmosTVLQuery {
  eachCosmosTVL {
    metric {
      chain_id
      denom
      chain
      validator_address
    }
    TVL
  }
}
```

```json
{
  "data": {
    "eachCosmosTVL": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "denom": "bld",
          "instance": "agoric",
          "validator_address": "agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g"
        },
        "TVL": "1008639.7739459188"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "denom": "akt",
          "instance": "akash",
          "validator_address": "akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073"
        },
        "TVL": "2805559.7188507"
      }
    ]
  }
}
```

##### Total Cosmos TVL

```graphql
query CosmosTVLQuery {
  allCosmosTVL {
    cosmosTVL
  }
}
```

```json
{
  "data": {
    "allCosmosTVL": [
      {
        "cosmosTVL": "46021663.09927347"
      }
    ]
  }
}
```

##### Bonded token with Forbole on each Cosmos chain

```graphql
query CosmosBondedToken {
  eachCosmosBondedToken {
    metric {
      chain_id
      chain
    }
    bondedToken
  }
}
```

```json
{
  "data": {
    "eachCosmosBondedToken": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "instance": "agoric"
        },
        "bondedToken": "401404164.21453"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "instance": "akash"
        },
        "bondedToken": "150424797.691372"
      }
    ]
  }
}
```

##### Commission rate for each Cosmos chain

```graphql
query CosmosCommission {
  eachCosmosCommission {
    metric {
      chain_id
      chain
      validator_address
    }
    commissionRate
  }
}
```

```json
{
  "data": {
    "eachCosmosCommission": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "instance": "agoric",
          "validator_address": "agoricvaloper1pcc069wu2utgnf5qsm6n2pk2x8xt6cah954t4g"
        },
        "commissionRate": "0.1"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "instance": "akash",
          "validator_address": "akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073"
        },
        "commissionRate": "0.03"
      }
    ]
  }
}
```

##### Unbonding time on each Cosmos chain

```graphql
query CosmosUnbondingTime {
  eachCosmosUnbondingTime {
    metric {
      chain_id
      chain
    }
    unbondingTime
  }
}
```

```json
{
  "data": {
    "eachCosmosUnbondingTime": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "instance": "agoric"
        },
        "unbondingTime": "21 days"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "instance": "akash"
        },
        "unbondingTime": "21 days"
      }
    ]
  }
}
```

##### APY on each Cosmos chain

```graphql
query CosmosAPY {
  eachCosmosAPY {
    metric {
      chain_id
      chain
    }
    APY
  }
}
```

```json
{
  "data": {
    "eachCosmosAPY": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "instance": "agoric"
        },
        "APY": "0.12656730188847093"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "instance": "akash"
        },
        "APY": "0.14549280922278507"
      }
    ]
  }
}
```

##### Inflation rate on each Cosmos chain

```graphql
query CosmosInflationRate {
  eachCosmosInflationRate {
    metric {
      chain_id
      chain
    }
    inflationRate
  }
}
```

```json
{
  "data": {
    "eachCosmosInflationRate": [
      {
        "metric": {
          "chain_id": "agoric-3",
          "instance": "agoric"
        },
        "inflationRate": "0.05"
      },
      {
        "metric": {
          "chain_id": "akashnet-2",
          "instance": "akash"
        },
        "inflationRate": "0.10937958859040699"
      }
    ]
  }
}
```

##### Token supply on each Cosmos chain

```graphql
query CosmosTokenSupply {
  eachCosmosTokenSupply {
    metric {
      chain
      chain_id
    }
    supply
  }
}
```

```json
{
  "data": {
    "eachCosmosTokenSupply": [
      {
        "metric": {
          "instance": "agoric",
          "chain_id": "agoric-3"
        },
        "supply": "1016094606.900574"
      },
      {
        "metric": {
          "instance": "akash",
          "chain_id": "akashnet-2"
        },
        "supply": "204170361.815201"
      }
    ]
  }
}
```

### Radix

---

5 schemas

##### TVL on Radix

```graphql
query RadixTVL {
  radixTVL {
    metric {
      validator_address
      chain
    }
    TVL
  }
}
```

```json
{
  "data": {
    "radixTVL": [
      {
        "metric": {
          "validator_address": "rv1qtkl4r2x86cn5nujyx7cnd6rup5tkuvvm7qqp0ycxa6fgv246k6d6nrq0kz",
          "instance": "radix"
        },
        "TVL": "3847550.113985192"
      }
    ]
  }
}
```

##### Users Count on Radix

```graphql
query RadixUsersCount {
  radixUsers {
    metric {
      validator_address
      chain
    }
    usersCount
  }
}
```

```json
{
  "data": {
    "radixUsers": [
      {
        "metric": {
          "validator_address": "rv1qtkl4r2x86cn5nujyx7cnd6rup5tkuvvm7qqp0ycxa6fgv246k6d6nrq0kz",
          "instance": "radix"
        },
        "usersCount": "1060"
      }
    ]
  }
}
```

##### Unbonding time on Radix

```graphql
query RadixUnbondingTime {
  radixUnbondingTime {
    metric {
      chain
    }
    unbondingTime
  }
}
```

```json
{
  "data": {
    "radixUnbondingTime": {
      "metric": {
        "instance": "radix"
      },
      "unbondingTime": "1-3 weeks (500 epochs)"
    }
  }
}
```

##### Token supply on Radix

```graphql
query RadixTotalSupply {
  allRadixTotalSupply {
    metric {
      chain
    }
    supply
  }
}
```

```json
{
  "data": {
    "allRadixTotalSupply": {
      "metric": {
        "instance": "radix"
      },
      "supply": "12437533004384111600000000000"
    }
  }
}
```

##### Bonded token with Forbole on Radix

```graphql
query RadixStakedTokens {
  allRadixStakedTokens {
    metric {
      chain
      validator_address
    }
    bondedToken
  }
}
```

```json
{
  "data": {
    "allRadixStakedTokens": {
      "metric": {
        "instance": "radix",
        "validator_address": "rv1qtkl4r2x86cn5nujyx7cnd6rup5tkuvvm7qqp0ycxa6fgv246k6d6nrq0kz"
      },
      "bondedToken": "99262229515026013586744372"
    }
  }
}
```

### Solana

---

5 schemas

##### Solana user count

```graphql
query SolanaUsers {
  solanaUsers {
    metric {
      chain
      validator_address
    }
    usersCount
  }
}
```

```json
{
  "data": {
    "solanaUsers": {
      "metric": {
        "instance": "solana",
        "validator_address": "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857"
      },
      "usersCount": "566"
    }
  }
}
```

##### Solana TVL

```graphql
query SolanaTVL {
  solanaTVL {
    metric {
      chain
      validator_address
    }
    TVL
  }
}
```

```json
{
  "data": {
    "solanaTVL": {
      "metric": {
        "instance": "solana",
        "validator_address": "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857"
      },
      "TVL": "6288793"
    }
  }
}
```

##### Unbonding time on Solana

```graphql
query SolanaUnbondingTime {
  solanaUnbondingTime {
    metric {
      chain
    }
    unbondingTime
  }
}
```

```json
{
  "data": {
    "solanaUnbondingTime": {
      "metric": {
        "instance": "solana"
      },
      "unbondingTime": "10 days"
    }
  }
}
```

##### Commission rate for Solana

```graphql
query SolanaCommission {
  solanaCommission {
    metric {
      chain
      validator_address
    }
    commissionRate
  }
}
```

```json
{
  "data": {
    "solanaCommission": {
      "metric": {
        "instance": "solana",
        "validator_address": "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857"
      },
      "commissionRate": "0.09"
    }
  }
}
```

##### Bonded token with Forbole on Solana

```graphql
query SolanaBondedToken {
  solanaBondedToken {
    metric {
      chain
      validator_address
    }
    bondedToken
  }
}
```

```json
{
  "data": {
    "solanaBondedToken": {
      "metric": {
        "instance": "solana",
        "validator_address": "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQfF66jZhQ857"
      },
      "bondedToken": "431329"
    }
  }
}
```

### Elrond

---

8 schemas

##### Elrond user count

```graphql
query ElrondUsers {
  elrondUsers {
    metric {
      chain
    }
    usersCount
  }
}
```

```json
{
  "data": {
    "elrondUsers": [
      {
        "metric": {
          "instance": "elrond"
        },
        "usersCount": "941"
      }
    ]
  }
}
```

##### Elrond TVL

```graphql
query ElrondTVL {
  elrondTVL {
    metric {
      chain
    }
    TVL
  }
}
```

```json
{
  "data": {
    "elrondTVL": [
      {
        "metric": {
          "instance": "elrond"
        },
        "TVL": "2991442878556965700000000"
      }
    ]
  }
}
```

##### Elrond APY

```graphql
query ElrondAPY {
  elrondAPY {
    metric {
      chain
      validator_address
    }
    APY
  }
}
```

```json
{
  "data": {
    "elrondAPY": [
      {
        "metric": {
          "instance": "elrond",
          "validator_address": "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40llllsfjmn54"
        },
        "APY": "900"
      }
    ]
  }
}
```

##### Unbonding time on Elrond

```graphql
query ElrondUnbondingTime {
  elrondUnbondingTime {
    metric {
      chain
    }
    unbondingTime
  }
}
```

```json
{
  "data": {
    "elrondUnbondingTime": {
      "metric": {
        "instance": "elrond"
      },
      "unbondingTime": "10 days"
    }
  }
}
```

##### Elrond total supply

```graphql
query ElrondTotalSupply {
  elrondTotalSupply {
    metric {
      chain
    }
    totalSupply
  }
}
```

```json
{
  "data": {
    "elrondTotalSupply": [
      {
        "metric": {
          "instance": "elrond"
        },
        "totalSupply": "24619259"
      }
    ]
  }
}
```

##### Commission rate on Elrond

```graphql
query ElrondCommission {
  elrondCommission {
    metric {
      chain
      validator_address
    }
    commissionRate
  }
}
```

```json
{
  "data": {
    "elrondCommission": [
      {
        "metric": {
          "instance": "elrond",
          "validator_address": "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40llllsfjmn54"
        },
        "commissionRate": "0.15"
      }
    ]
  }
}
```

##### Elrond circulating supply

```graphql
query ElrondCirculatingSupply {
  elrondCirculatingSupply {
    metric {
      chain
    }
    circulatingSupply
  }
}
```

```json
{
  "data": {
    "elrondCirculatingSupply": [
      {
        "metric": {
          "instance": "elrond"
        },
        "circulatingSupply": "23858327"
      }
    ]
  }
}
```

##### Bonded token with Forbole on Elrond

```graphql
query ElrondBondedToken {
  elrondBondedToken {
    metric {
      chain
      validator_address
    }
    bondedToken
  }
}
```

```json
{
  "data": {
    "elrondBondedToken": [
      {
        "metric": {
          "instance": "elrond",
          "validator_address": "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqq40llllsfjmn54"
        },
        "bondedToken": "69600812247968570000000"
      }
    ]
  }
}
```

### Oasis

---

4 schemas

##### Oasis user count

```graphql
query OasisUsers {
  oasisUsers {
    metric {
      chain
      validator_address
    }
    usersCount
  }
}
```

```json
{
  "data": {
    "oasisUsers": [
      {
        "metric": {
          "instance": "oasis",
          "validator_address": "oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0"
        },
        "usersCount": "135"
      }
    ]
  }
}
```

##### Bonded token with Forbole on Oasis

```graphql
query OasisBondedToken {
  oasisBondedToken {
    metric {
      chain
      validator_address
    }
    bondedToken
  }
}
```

```json
{
  "data": {
    "oasisBondedToken": [
      {
        "metric": {
          "instance": "oasis",
          "validator_address": "oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0"
        },
        "bondedToken": "82692502.44758473"
      }
    ]
  }
}
```

##### Commission rate on Oasis

```graphql
query OasisCommission {
  oasisCommission {
    metric {
      chain
      validator_address
    }
    commissionRate
  }
}
```

```json
{
  "data": {
    "oasisCommission": [
      {
        "metric": {
          "instance": "oasis",
          "validator_address": "oasis1qrtq873ddwnnjqyv66ezdc9ql2a07l37d5vae9k0"
        },
        "commissionRate": "0.2"
      }
    ]
  }
}
```

##### Oasis TVL

```graphql
query OasisTVL {
  oasisTVL {
    metric {
      chain
    }
    TVL
  }
}
```

```json
{
  "data": {
    "oasisTVL": [
      {
        "metric": {
          "instance": "oasis"
        },
        "TVL": "3843722.282591173"
      }
    ]
  }
}
```

**This repo is in active development.**
