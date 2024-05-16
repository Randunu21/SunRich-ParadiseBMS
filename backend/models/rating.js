const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  productID: {
    type: Number,
    ref: "product",
    required: true,
  },
  ratingValue: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("rating", ratingSchema);
