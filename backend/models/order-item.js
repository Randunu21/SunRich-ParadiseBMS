const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },

  quantity: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("orderItem", orderItemSchema);
