const express = require("express");
require("dotenv").config();
const orderRoutes = require("./routes/orders");

const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/orders", orderRoutes);

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
