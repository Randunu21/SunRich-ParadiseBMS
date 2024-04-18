const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    productname : {
        type : String,
        required: true
    },
    product_type : {
        type : String,
        required: true
    },
    quantity : {
        type : Number,
        required: true
    },
    
    price : {
        type : Number,
        required: true
    },

    ratings: {
        type: Number,
      // Default value for ratings, you can adjust as needed
    },
})

const Product = mongoose.model("product",productSchema);

module.exports = Product;