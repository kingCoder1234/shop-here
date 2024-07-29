require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("../src/routes/userRoutes");
const AdminRoutes = require("../src/routes/adminRoutes");
const productRoutes = require("../src/routes/productRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

app.use("/", UserRoutes);
app.use("/", AdminRoutes);
app.use("/", productRoutes);

module.exports = app;
