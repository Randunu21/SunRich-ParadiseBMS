const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const supplierRouter=require("./routes/suppliers.js");
const supplierorder = require("./models/supplierorder.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/suppliers",supplierRouter);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/supplierorder",supplierRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening to port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
