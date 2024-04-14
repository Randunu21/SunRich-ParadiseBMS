const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("cartitem", cartItemSchema);