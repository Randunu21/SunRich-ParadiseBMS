const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("orderItem", orderItemSchema);
