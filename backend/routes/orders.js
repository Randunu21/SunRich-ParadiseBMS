const express = require("express");
const OrderModel = require("../models/order");
const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart");
const CartItems = require("../models/cart-item");
const nodemailer = require("nodemailer");

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
router.post("/addOrder", async (req, res) => {
  const newOrder = new OrderModel({
    cartID: req.body.cartID,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    status: req.body.status,
    totlaPrice: req.body.totlaPrice,
    userID: req.body.userID,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    dateOfOrder: req.body.dateOfOrder,
  });

  try {
    await newOrder.save();
    res.json({ msg: "Order Added to the System" });
  } catch (err) {
    if (err.errors && err.errors.phoneNumber) {
      // If there's a validation error on the phone number
      res.status(400).json({ msg: err.errors.phoneNumber.message });
    } else {
      // Other errors
      res.status(500).json({ msg: "An error occurred", error: err });
    }
  }
});

//delete an order
router.delete("/deleteOrder/:id", async (req, res) => {
  const id = req.params.id;

  const cart = await OrderModel.findById(id);
  const cartId = cart.cartID; //to get the cartID from the order ID

  console.log(cartId);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.json("Invalid Id");
  }

  //delete order along with its cart and its items
  const deleteOrder = await OrderModel.findByIdAndDelete({ _id: id });
  if (deleteOrder) {
    await Cart.findByIdAndDelete(cartId).then(async (cart) => {
      await cart.cartItems.map(async (cartitem) => {
        await CartItems.findByIdAndDelete(cartitem);
      });
    });
    res.json({ msg: "Order deleted Successfully" });
  } else {
    res.json({ msg: "couldnt delete" });
  }
});

//Updating an order

router.patch("/updateOrder/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ msg: "Invalid Id" });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      postalCode: req.body.postalCode,
      status: req.body.status,
    });

    const updatedVersion = await OrderModel.findById(id);

    if (!updatedOrder) {
      res.json({ msg: "Update failed" });
    } else {
      res.json(updatedVersion);
    }
  } catch (error) {
    res.json(error);
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
router.get("/ongoing-orders", async (req, res) => {
  try {
    const currentOrders = await OrderModel.find({
      status: "on going",
    }).populate("cartID");
    res.json(currentOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting orders with status = completed

router.get("/past-orders", async (req, res) => {
  try {
    const pastOrders = await OrderModel.find({ status: "Completed" }).populate(
      "cartID"
    );
    res.json(pastOrders);
  } catch (err) {
    res.json({ msg: err });
  }
});

//updating all order(specific orderID) details with user = admin

// getting all orders specific to user
router.get("/all-orders/user/:userID", async (req, res) => {
  try {
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
  } catch (error) {
    res.json(error);
  }
});

//getting psst orders specific to user(for order history page)
router.get("/past-orders/user/:id", async (req, res) => {
  const user = req.params.id;

  try {
    const userPastOrders = await OrderModel.find({
      status: "completed",
      userID: user,
    }).populate({
      path: "cartID",
      populate: { path: "cartItems", model: "cartitem" },
    });
    res.json(userPastOrders);
  } catch (error) {
    res.json(error);
  }
});

//getting orders specific to user which are ongoing
router.get("/current-orders/user/:id", async (req, res) => {
  const user = req.params.id;

  try {
    const userCurrentOrders = await OrderModel.find({
      status: { $ne: "completed" }, //$ne excludes all the results that have completed
      userID: user,
    }).populate({
      path: "cartID",
      populate: { path: "cartItems", model: "cartitem" },
    });
    res.json(userCurrentOrders);
  } catch (error) {
    res.json(error);
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      File,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

// Route to get total number of orders in a month
router.get("/total-orders", async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // One month ago
    const totalOrders = await OrderModel.countDocuments({
      dateOfOrder: { $gte: startDate },
    });
    res.json({ totalOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
