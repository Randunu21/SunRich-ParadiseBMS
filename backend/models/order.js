const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
  },

  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },

  postalCode: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
    default: "pending",
  },

  totalPrice: {
    type: Number,
  },
  userID: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },

  shippingCost: {
    type: Number,
  },
  dateOfOrder: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
