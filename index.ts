/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express"
import { v1 } from './routers'
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import {typeDefs} from "./graphql/typedefs";
import { resolvers } from "./graphql/resolvers";
import { CosmosAPI } from "./graphql/routes/cosmos-api";
import cors from 'cors';
import bodyParser from 'body-parser';

interface ContextValue {
  dataSources?: {
    cosmosAPI: CosmosAPI;
  };
}

(async () => {

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// middlewares
app.use(express.json());

app.use(cors());

app.use('/api/v1/', v1);

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);


app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server, {context: async ({req}) => {
  const {cache} = server;
  // const {dataSources} =req.headers;
  // console.log('express', req, res)
  console.log('cosmos API', CosmosAPI);
  return ({
    dataSources: {
      cosmosAPI: new CosmosAPI({cache}),
    },
    // req
  });
},}))


// health check api
app.get('/ping', (_req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).send('pong')
  } catch (err) {
    next(err)
  }
})

// 404 middleware
app.use((_req, _res, next) => {
  const error = new Error('Not found') as ResponseError;
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    }
  });
});

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// const server = new ApolloServer<ContextValue>({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server, {
//   context: async ({ req }) => {
//     const { cache } = server;
//     return {
//       dataSources: {
//         moviesAPI: new CosmosAPI({ cache }),
//       },
//     };
//   },
// });

//
// app.listen(({ url }) => {
//   console.log(`Apollo server is listening on ${url}`);
// }); 
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();

// export default app