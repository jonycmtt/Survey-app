const express = require("express");
const mongoose = require("mongoose");
const applyMiddleware = require("./middlewares/appplyMiddleware");
// const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

applyMiddleware(app);

// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsqvega.mongodb.net`;

// // Connect to MongoDB
// mongoose.connect(uri, { });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB!");

// Routes and middleware setup
app.get("/health", (req, res) => {
  res.send("Car Doctor is Running");
});

app.all("*", (req, res, next) => {
  const error = new Error(`the request url is invalid: [${req.url}]`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

// Start the Express app after the MongoDB connection is established
const main = () => {
  console.log("connection to database..");
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsqvega.mongodb.net`;
  mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log("Connected to database");

  app.listen(port, () => {
    console.log(`Car Server is running on port ${port}`);
  });
};

main()
