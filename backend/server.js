const express = require("express");
require("dotenv").config();
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/shoppingCart");
const quotationRoutes = require("./routes/quotationRoutes");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quotations", quotationRoutes);

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
