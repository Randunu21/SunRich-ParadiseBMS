const express = require("express");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
