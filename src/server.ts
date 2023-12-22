import { ApolloServer } from "@apollo/server";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import http from "node:http";

import { resolvers } from "./graphql/resolvers";
import { ArchwayAPI } from "./graphql/routes/archway-api";
import { CosmosAPI } from "./graphql/routes/cosmos-api";
import { ElrondAPI } from "./graphql/routes/elrond-api";
import { OasisAPI } from "./graphql/routes/oasis-api";
import { RadixAPI } from "./graphql/routes/radix-api";
import { RadixPromAPI } from "./graphql/routes/radix-prom-api";
import { SolanaAPI } from "./graphql/routes/solana-api";
import { SuiAPI } from "./graphql/routes/sui-api";
import { typeDefs } from "./graphql/typedefs";
import type { ContextValue } from "./graphql/types";

export const setupServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      responseCachePlugin(),
    ],
  });

  await server.start();

  app.use(express.json());

  app.use(cors());

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        const { cache } = server;

        const context: ContextValue = {
          dataSources: {
            archwayAPI: new ArchwayAPI({ cache }),
            cosmosAPI: new CosmosAPI({ cache }),
            elrondAPI: new ElrondAPI({ cache }),
            oasisAPI: new OasisAPI({ cache }),
            radixAPI: new RadixAPI({ cache }),
            radixPromAPI: new RadixPromAPI({ cache }),
            solanaAPI: new SolanaAPI({ cache }),
            suiAPI: new SuiAPI({ cache }),
          },
        };

        return context;
      },
    }),
  );

  // health check api
  app.get("/ping", (_req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).send("pong");
    } catch (err) {
      next(err);
    }
  });

  // 404 middleware
  app.use((_req, _res, next) => {
    const error = new Error("Not found") as ResponseError;

    error.status = 404;
    next(error);
  });

  // error handler middleware
  app.use(
    (
      error: ResponseError,
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || "Internal Server Error",
        },
      });
    },
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};
