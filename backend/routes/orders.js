const express = require("express");
const OrderModel = require("../models/order");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  const allOrders = await OrderModel.find();

  if (!allOrders) {
    res.json({ msg: "no Orders to Display" });
  } else {
    res.status(200).json(allOrders);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = await req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "Invalid id" });
  }

  const specOrder = OrderModel.findById(id);

  if (!specOrder) {
    res.status(404).json({ msg: "IDs Not Found" });
  } else {
    res.status(200).json(specOrder);
  }
});

router.post("/", async (req, res) => {
  const newOrderItemsIDs = Promise.all(
    req.body.orderItems.map(async (orderItemsOBJ) => {
      const newOrderItems = new orderItemsOBJ({
        product: req.body.product,
        quantity: req.body.quantity,
      });

      await newOrderItems
        .save()
        .then(() => {
          res.json({ msg: "orderItems Added" });
        })
        .catch((err) => {
          console.log(err);
        });

      return newOrderItems._id;
    })
  );

  const newOrderItemsIDsResolved = await newOrderItemsIDs;

  const newOrder = new Order({
    orderItems: newOrderItemsIDsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    status: req.body.status,
    totlaPrice: req.body.totlaPrice,
    userID: req.body.userID,
    dateOfOrder: req.body.dateOfOrder,
  });

  await Order.save()
    .then(() => {
      res.json({ msg: "Order Added to the System" });
    })
    .catch((err) => {
      console.log(err);
    });
});
