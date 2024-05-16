require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/shoppingCart");
const quotationRoutes = require("./routes/quotationRoutes");

const mongoose = require("mongoose");
const feedbackRouter = require("./routes/feedbackroute.js");
const inquiryRouter = require("./routes/inquiryRoute.js");
const replyRouter = require("./routes/replyRoute.js");
const authRoute = require("./routes/auth.js");

const path = require("path"); // Import path module

const app = express();
app.use(cors());
app.use(express.json());

//middleware

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", productRoutes);
app.use("/feedback", feedbackRouter);
app.use("/inquiry", inquiryRouter);
app.use("/reply", replyRouter);
//order-routes
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/auth", authRoute);

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
