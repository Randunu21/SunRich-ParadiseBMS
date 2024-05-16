// Schema for creating Product

const mongoose = require("mongoose");

const ProductModal = mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("product", ProductModal);
