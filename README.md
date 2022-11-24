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

[An external link to our public GraphQL APIs](https://api.forbole.com/graphql)

In **non-production** environments, an embedded version of Apollo Sandbox is shown on Apollo Server 4's landing page, served at `http://localhost:4000/graphql`.

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

##### TVL for each Cosmos SDK chain

```graphql
query CosmosTVLQuery {
  eachCosmosTVL {
    metric {
      chain_id
      denom
      instance
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

##### Bonded token count on each Cosmos chain

```graphql
query CosmosBondedToken {
  eachCosmosBondedToken {
    metric {
      chain_id
      instance
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
      instance
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
      instance
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
      instance
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
      instance
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
      instance
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

3 schemas

##### Unbonding time on Radix

```graphql
query RadixUnbondingTime {
  radixUnbondingTime {
    metric {
      instance
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

**This repo is in active development.**
