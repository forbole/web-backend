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

#### Public endpoint for data querying:

[An external link to our public GraphQL APIs](https://api.forbole.com/graphql)

In **non-production** environments, an embedded version of Apollo Sandbox is shown on Apollo Server 4's landing page, served at `http://localhost:4000/graphql`.

##### querying of `total no. of users staked to Forbole on all Cosmos SDK chains` on Sandbox:

```graphql
query Query {
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
        "usersCount": "36511"
      }
    ]
  }
}
```

In **production** environments, when `NODE_ENV` is `production`, users can query data as follows:

#### POST `/graphql`

##### querying `total no. of users staked to Forbole on all Cosmos SDK chains`:

```zsh
curl --request POST \
  --header 'content-type: application/json' \
  --url http://localhost:4000/graphql \
  --data '{"query":"query {cosmosUsersCount{usersCount}}"}'
```

#### Example Response:

```zsh
{"data":{"cosmosUsersCount":[{"usersCount":"36511"}]}}
```

## Available Scripts

In this project directory, you can run:

`npm start`
Runs the server in production mode pointing to the build in the `dist` folder.

`npm run dev`
Runs the server in development mode on `http://localhost:4000/`.

`npm run build`
Builds the server for production to the `dist` folder.

`npm test`
Runs any test in the folder marked as \*.spec.ts or \*.test.ts using jest.

**This repo is in active development.**
