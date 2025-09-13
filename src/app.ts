import express from "express";

const app = express();

app.get("/", (req: express.Request, res: express.Response): void => {
  res.status(200).json({
    success: true,
    message: "Hello world!",
  });
});

app.listen(5500, () => console.log("Server listening on 5500 port"));
