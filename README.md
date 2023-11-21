# Web backend

Express API server in Node.js that serves up REST API and GraphQL endpoints, handling various **APIs** requests for all frontend apps.

## APIs

### Responses

All the below listed API endpoints return `200` when a request is successful, and various different codes, e.g., `400`, `500` etc., when something wrong happens.

### Graphql

#### Public Graphql endpoint for data querying:

[An external link to our public GraphQL APIs.](https://api.forbole.com/graphql)

In **non-production** environments, an embedded version of Apollo Sandbox is shown on Apollo Server 4's landing page, served at `http://localhost:4000/graphql`.

[You can find the schema here.](src/graphql/typedefs/index.ts)

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

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url https://api.forbole.com/graphql \
  --data '{"query":"query {cosmosUsersCount{usersCount}}"}' |
    jq
```

##### Example Response:

```json
{
  "data": {
    "cosmosUsersCount": [
      {
        "usersCount": "46010"
      }
    ]
  }
}
```
