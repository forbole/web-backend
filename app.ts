// const express = require("express");
import "dotenv-defaults/config";
import express, {Request, Response, NextFunction} from "express"
import { HttpException } from './exceptions/HttpException'
const cors = require("cors");
// import cors from 'cors'

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./routes/api");
// import api_routes from "./routes/api"

const url = process.env.PUBLIC_URL;

(async () => {
  try {
    app.use(cors());

    app.use("/api", routes);

    // error handler
    app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
      res.status(err?.status || 500).json({
        message: err?.message || 'Internal server error.',
        stack: err?.stack,
        error: err,
      })
    })

    app.listen(PORT, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on ${url}`);
      console.log(`> ENV:  ${process.env.NODE_ENV}`);
      console.log(`> PORT:  ${process.env.PORT}`);
    });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
})();
