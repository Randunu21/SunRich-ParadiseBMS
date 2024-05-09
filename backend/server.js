const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening to port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
