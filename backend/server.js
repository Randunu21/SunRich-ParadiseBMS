require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const productRouter = require("./routes/products.js");



const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/product",productRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log("Listening to port 4000");
    });
  }).catch((error) => {
    console.log(error);
  });

   
