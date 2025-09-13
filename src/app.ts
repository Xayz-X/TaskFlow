import express from "express";
import { PORT } from "./config/env";

const app = express();

app.get("/", (req: express.Request, res: express.Response): void => {
  res.status(200).json({
    success: true,
    message: "Hello world!",
  });
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
