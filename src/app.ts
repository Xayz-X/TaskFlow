import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import { Request, Response } from "express-serve-static-core";

import limiter from "./config/ratelimit";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { ENVIRONMENT, PORT } from "./config/env";
import connectToDatabase from "./database/database";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

// middlewares
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

// health check ednpoint
app.get("/health", (request: Request, response: Response): void => {
  response.status(200).send({
    success: true,
    message: `Running on port ${PORT}`,
  });
});

// custom middlewares
app.use(errorMiddleware);

// start the server on the .env file defined port
app.listen(
  PORT,
  async () =>
    await connectToDatabase()
      .then(() =>
        console.log(
          `${ENVIRONMENT} server listening on http://localhost:${PORT}`
        )
      )
      .catch((error) => console.log(error))
);
