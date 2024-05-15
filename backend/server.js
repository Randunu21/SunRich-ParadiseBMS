require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const supplierRoutes = require('./routes/supplierRoutes')

const cors = require("cors")

const app = express();
app.use(cors())

//global middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes

app.use('/api/supplier', supplierRoutes)


//connect to db

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    app.listen(4000, () => {
        console.log("Listening to port 4000");
    })
 })
 .catch((error) => {
    console.log(error);
 })