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
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{10,}/.test(v); // This regex checks for at least 10 digits
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It must have at least 10 digits.`,
    },
    required: [true, "User phone number required"],
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