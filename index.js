import express from "express";
import "dotenv/config";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: `Formbot server up and running.`,
    time: new Date(),
  });
});

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }

  console.log(`server up and running on port ${PORT}`);
});
