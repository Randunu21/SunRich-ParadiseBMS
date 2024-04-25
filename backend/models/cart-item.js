const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Number,
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
  },
});

module.exports = mongoose.model("cartitem", cartItemSchema);
