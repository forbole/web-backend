# Web backend

A node server using express and handle various **APIS** request for frontend apps.

## Available Scripts

In this project directory, you can run:
`npm start`
Runs the server in production mode pointing to the build in the `dist` folder.

`npm run dev`
Runs the server in development mode on `http://localhost:3000/`.

`npm run build`
Builds the server for production to the `dist` folder.

`npm test`
Runs any test in the folder marked as \*.spec.ts or \*.test.ts using jest.

## APIs

### Responses

All the below listed API endpoints return `200` when a request is successful, and various different codes, e.g., `400`, `500` etc., when something wrong happens.

### Contact

#### POST `/contact`

Requesting to send information/e-mails/feekbacks to Forbole e-mail address.

Upon the request is successful, a `200` status will br returned with the success message as below:

```json
{
  "success": "true"
}
```

**This repo is in active development**
