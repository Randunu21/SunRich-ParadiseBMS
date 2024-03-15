const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cart = new Schema({
  userID: {
    type: Number, //change
    required: true,
  },
  orderItems: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderitems",
  },
});
