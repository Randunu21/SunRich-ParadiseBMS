require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const incomesRoutes = require('./routes/incomes')
const ordersRoutes = require('./routes/orders')
const usersRoutes = require('./routes/users')


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

app.use('/api/incomes', incomesRoutes)
app.use('/api/incomes', ordersRoutes)
app.use('/api/users', usersRoutes)

//connect to db

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT)
    })
 })
 .catch((error) => {
    console.log(error)
 })
