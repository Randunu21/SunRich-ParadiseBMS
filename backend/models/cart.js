const mongoose = require("mongoose");
const CartItem = require("../models/cart-item");

const Schema = mongoose.Schema;

const cart = new Schema({
  userID: {
    type: Number, //change
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartitem",
    },
  ],

  totalPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("cart", cart);
