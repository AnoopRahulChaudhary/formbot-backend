import express from "express";
import "dotenv/config";
import { connectToDb } from "./util/db.js";
import userRoute from "./src/routes/userRoute.js";
import healthRoute from "./src/routes/healthRoute.js";
import formRoute from "./src/routes/formRoute.js";
import bodyParser from "body-parser";
import handleError from "./src/middleware/errorHandler.js";
import cors from "cors";
import folderRoute from "./src/routes/folderRoute.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/health", healthRoute);
app.use("/user", userRoute);
app.use("/form", formRoute);
app.use("/folder", folderRoute);

app.use(handleError);

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
