import express from "express";
import "dotenv/config";
import { connectToDb } from "./util/db.js";

const PORT = process.env.PORT;

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: `Formbot server up and running.`,
    time: new Date(),
  });
});

async function main() {
  await connectToDb();

  app.listen(PORT, async (error) => {
    if (error) {
      console.log(`Server not started. ${error.message}`);
      return;
    }

    console.log(`server up and running on port ${PORT}`);
  });
}

main();
