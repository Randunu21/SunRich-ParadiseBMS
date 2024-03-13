const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItems",
      required: true,
    },
  ],

  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
    required: true,
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
    type: mongoose.Schema.Types.ObjectId,
  },
  dateOfOrder: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);
