require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const feedbackRouter = require("./routes/feedbackroute.js");
const inquiryRouter = require("./routes/inquiryRoute.js");
const replyRouter=require("./routes/replyRoute.js");
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use("/feedback", feedbackRouter);
app.use("/inquiry", inquiryRouter);
app.use("/reply",replyRouter);
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