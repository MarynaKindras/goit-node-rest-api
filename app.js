import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("\x1b[34m Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log("\x1b[31m Error during connection to database \n", error);
    process.exit(1);
  });
