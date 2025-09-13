import express from "express";
import { Request, Response } from "express-serve-static-core";
import { ENVIRONMENT, PORT } from "./config/env";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/auth", authRouter);

// health check ednpoint
app.get("/health", (request: Request, response: Response): void => {
  response.status(200).send({
    success: true,
    message: `Running on port ${PORT}`,
  });
});

// start the server on the .env file defined port
app.listen(PORT, () =>
  console.log(`${ENVIRONMENT} server listening on http://localhost:${PORT}`)
);
