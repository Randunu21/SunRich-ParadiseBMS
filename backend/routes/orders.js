const express = require("express");
const OrderModel = require("../models/order");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", (req, res) => {
  const allOrders = OrderModel.find();

  if (!allOrders) {
    res.json({ msg: "no Orders to Display" });
  } else {
    res.status(200).json(allOrders);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "Invalid id" });
  }

  const specOrder = OrderModel.findById(id);
});

router.post("/", (req, res) => {});
