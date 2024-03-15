const express = require("express");
const OrderModel = require("../models/order");
const { default: mongoose } = require("mongoose");
const OrderItemModel = require("../models/order-item");
const orderItem = require("../models/order-item");

const router = express.Router();

//Get all orders
router.get("/all-orders", async (req, res) => {
  const allOrders = await OrderModel.find();

  if (!allOrders) {
    res.json({ msg: "no Orders to Display" });
  } else {
    res.status(200).json(allOrders);
  }
});

//get a specific order
router.get("/all-orders/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "Invalid id" });
  } else {
    const specOrder = await OrderModel.findById(id);

    if (!specOrder) {
      res.status(404).json({ msg: "IDs Not Found" });
    } else {
      res.status(200).json(specOrder);
    }
  }
});

//adding a new order
router.post("/", async (req, res) => {
  const newOrderItemsIDs = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      const newOrderItems = new OrderItemModel({
        product: orderItem.product,
        quantity: orderItem.quantity,
      });

      await newOrderItems.save();

      return newOrderItems._id;
    })
  );

  const newOrderItemsIDsResolved = await newOrderItemsIDs;

  const newOrder = new OrderModel({
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

  newOrder
    .save()
    .then(() => {
      res.json({ msg: "Order Added to the System" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete an order
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("Invalid Id");
  }

  const deletedItem = await OrderModel.findByIdAndDelete({ _id: id })
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItemModel.findByIdAndDelete(orderItem);
        });
        return res.json({ msg: "order deleted" });
      } else {
        return res.json({ msg: "order deletion failed" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//Updating status of an order

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json({ msg: "Invalid Id" });
  }

  const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
    status: req.body.status,
  });

  if (!updatedOrder) {
    res.json({ msg: "Update failed" });
  } else {
    res.json({ msg: "updated successfully" });
  }
});

//getting orders with status = pending
router.get("/pending-orders", async (req, res) => {
  try {
    const pendingOrders = await OrderModel.find({ status: "pending" });
    res.json(pendingOrders);
  } catch (err) {
    res.json({ msg: err });
  }
});

//getting orders with status = ongoing
router.get("/current-orders", async (req, res) => {
  try {
    const currentOrders = await OrderModel.find({ status: "on going" });
    res.json(currentOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting orders with status = completed

router.get("/past-orders", async (req, res) => {
  try {
    const pastOrders = await OrderModel.find({ status: "Completed" });
    res.json(pastOrders);
  } catch (err) {
    res.json({ msg: err });
  }
});

//updating all order(specific orderID) details with user = admin

// getting all orders specific to user
router.get("/all-orders/user/:userID", async (req, res) => {
  const user = req.params.userID;

  /*if (!mongoose.Types.ObjectId.isValid(user)) {
      res.json({ msg: "Invalid User Id" });
    }*/

  const userOrders = await OrderModel.find({ userID: user });

  if (userOrders.length == 0) {
    res.json({ msg: "No Orders Made By this User" });
  } else {
    res.json(userOrders);
  }
});

//getting ongoing/pending orders specific to user

module.exports = router;
