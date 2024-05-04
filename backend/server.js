const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const inventoryRouter= require("./routes/Inventory.js");
const factoryRequest = require("./routes/factoryRequest.js")

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

// app.use(cors());
// app.use(bodyParser.json());

// const URI = process.env.MONGO_URI;

// mongoose.connect(URI, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopologyL: true,
//   useFindAndModify:false
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB Connection success!");
// })


// const PORT = 8070;
// app.listen(PORT, () => {
//   console.log('Server is up and running on port ${PORT}');
// });


app.use("/Inventory",inventoryRouter);
app.use("/factory-request" , factoryRequest);




app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening to port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
  



//localhost//:Inventory/add