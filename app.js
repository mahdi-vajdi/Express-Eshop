require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectDB = require("./configs/database.config.js");

const app = express();
const PORT = process.env.PORT;

// CORS
app.use(cors());
app.options("*", cors());

// Connect to the database
mongoose.set("strictQuery", false);
connectDB();

// Parse urlencoded data
app.use(express.urlencoded({ extended: false }));

// Parse json files in requests
app.use(express.json());

// Logger
app.use(morgan("tiny"));

//Routes
const api = process.env.API_URL;
app.use(`${api}/products`, require("./routes/products.route"));

// Start Listetning
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
