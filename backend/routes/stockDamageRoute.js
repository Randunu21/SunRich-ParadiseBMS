const express = require('express');
const router = express.Router();
const StockDamage = require('../models/stockDamageModel');

// Add stock damage route
router.post("/add", (req, res) => {
    const { productID, damage } = req.body;

    const newStockDamage = new StockDamage({
        productID,
        damage
    });

    newStockDamage.save()
        .then(() => {
            res.json("Stock damage added successfully.");
        })
        .catch((err) => {
            console.error("Error adding stock damage:", err);
            res.status(500).json({ error: "An error occurred while adding stock damage." });
        });
});

module.exports = router;
