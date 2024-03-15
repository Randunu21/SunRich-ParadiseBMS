const mongoose = require("mongoose");
const express = require("express");

const Cart = require("../models/order-item");

const router = express.Router();

//get router by an ID
router.get("/getCart/:id", (req, res) => {
  const cartID = req.params.id;

  const specCart = Cart.findById(cartID);

  if (!specCart) {
    res.json({ msg: "You Dont Have A Cart Currently" });
  } else {
    res.json(specCart);
  }
});

//delete cart
router.delete("/deleteCart/:id", (req, res) => {
  const cartID = req.params.id;

  if (!cartID) {
    res.json({ msg: "No Such Cart Available" });
  } else {
    const deleteCart = Cart.findByIdAndDelete(cartID);
    res.json(deleteCart);
  }
});

//update cart

router.patch("/updateCart/:id", (req, res) => {
  const cartID = req.params.id;

  if (!cartID) {
    res.json({ msg: "No Cart Available" });
  } else {
    const updateCart = Cart.findByIdAndUpdate(cartID, {
      product: req.body.product,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
    });
  }
});

//get a cart of an user

router.get("/userCart/:userID", (req, res) => {
  const user = req.params.userID;

  const getUserCart = Cart.find({ userID: user });

  if (!getUserCart) {
    res.json({ msg: "No Cart found" });
  } else {
    res.json(getUserCart);
  }
});

//new cart creation
router.post("/createCart", (req, res) => {
  const { userID, product, quantity, totalPrice } = req.body;

  try {
    const newCart = Cart.create({ userID, product, quantity, totalPrice });
    res.json(newCart);
  } catch (error) {
    res.json({ msg: error });
  }
});
