import express from "express";
import { PORT } from "./config/env";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// health check ednpoint
app.get("/health", (req: express.Request, res: express.Response): void => {
  res.status(200).json({
    success: true,
    message: `Running on port: ${PORT}`,
  });
});

// start the server on the .env file defined port
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
