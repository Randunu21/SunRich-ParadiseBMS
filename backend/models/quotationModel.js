const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quotationsSchema = new Schema({
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },

  firstName: {
    type: String,
  },
  secondName: {
    type: String,
  },

  shippingAddress1: {
    type: String,
  },
  shippingAddress1: {
    type: String,
  },
  postalCode: {
    type: String,
  },

  status: {
    type: String,
    default: "Pending",
  },

  userID: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  reply: {
    type: String,
  },
  shippingCost: {
    type: Number,
  },

  dateOfQuotation: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
  },
  shippingCost: {
    type: Number,
  },
});

module.exports = mongoose.model("quotation", quotationsSchema);
