import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import http from "node:http";

import { resolvers } from "./graphql/resolvers";
import {
  CosmosAPI,
  ElrondAPI,
  OasisAPI,
  RadixAPI,
  RadixPromAPI,
  SolanaAPI,
} from "./graphql/routes";
import { typeDefs } from "./graphql/typedefs";
import type { ContextValue } from "./graphql/types";
import { v1 } from "./routers";

require("dotenv").config();

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(express.json());

  app.use(cors());

  app.use("/api/v1/", v1);

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        const { cache } = server;

        const context: ContextValue = {
          dataSources: {
            cosmosAPI: new CosmosAPI({ cache }),
            radixAPI: new RadixAPI({ cache }),
            elrondAPI: new ElrondAPI({ cache }),
            solanaAPI: new SolanaAPI({ cache }),
            oasisAPI: new OasisAPI({ cache }),
            radixPromAPI: new RadixPromAPI({ cache }),
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

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
