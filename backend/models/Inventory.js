const mongoose = require('mongoose');

const Schema = mongoose.Schema;
    // const inventorySchema: mongoose.Schema<any>

const inventorySchema = new Schema({

    code:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const InventoryItem = mongoose.model('InventoryItem', inventorySchema);

module.exports = InventoryItem;