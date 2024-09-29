import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

const PORT = 3002;

app.listen(PORT, (res, req) => {
  console.log(`Start Port ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Get success");
});
