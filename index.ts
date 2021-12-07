import express, { Request, Response, NextFunction } from "express"
import { v1 } from './routers'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(express.json());

app.use(cors());

app.use('/api/v1/', v1);

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (error?: any) => {
    if (error) throw error;
    console.log(`> Ready at http://localhost:${PORT}`);
    console.log(`> ENV: ${process.env.NODE_ENV}`);
    console.log(`> PORT: ${PORT}`);
  });
}


export default app