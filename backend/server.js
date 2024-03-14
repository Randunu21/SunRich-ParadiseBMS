const express = require("express");
require("dotenv").config();
const routesAtemp = require("./routes/EmployeeRouter")
const mongoose = require("mongoose");

const app = express();

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/employees" , routesAtemp)

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
