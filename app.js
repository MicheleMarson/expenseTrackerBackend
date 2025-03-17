require("express-async-errors");
require("dotenv").config();

const express = require("express");
const cors = require("cors")
const errorHandle = require("./handlers/errorHandler");

const app = express();
app.use(cors())
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

mongoose
  .connect(process.env.MONGO_CONNECT, {})
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

//models initialisation
require("./models/users.model");
require("./models/transactions.model")

app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not found"
  })
})

app.use(errorHandle);

app.listen(8000, () => {
  console.log("Server running");
});
