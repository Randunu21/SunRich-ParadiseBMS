const mongoose = require("mongoose");
const express = require("express");

const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

const router = express.Router();

//get router by an ID
router.get("/getCart/:id", async (req, res) => {
  const cartID = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cartID)) {
    res.json({ msg: "invalid ID" });
  } else {
    const specCart = await Cart.findById(cartID).populate("cartItems");

    if (!specCart) {
      res.json({ msg: "You Dont Have A Cart Currently" });
    } else {
      res.json(specCart);
    }
  }
});

//delete cart
router.delete("/deleteCart/:id", async (req, res) => {
  const cartID = req.params.id;

  if (!cartID) {
    res.json({ msg: "No Such Cart Available" });
  } else {
    Cart.findByIdAndDelete(cartID)
      .then(async (cart) => {
        if (cart) {
          await cart.cartItems.map(async (cartItem) => {
            await CartItem.findByIdAndDelete(cartItem);
          });
          return res.json({ msg: "Cart Deleted" });
        } else {
          return res.json({ msg: "cart not deleted" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//update cart

router.patch("/updateCart/:id", async (req, res) => {
  const cartID = req.params.id;

  if (!cartID) {
    res.json({ msg: "No Cart Available" });
  } else {
    try {
      const existingCart = await Cart.findById(cartID).populate("cartItems");

      if (!existingCart) {
        return res.json({ msg: "Cart not found" });
      }

      // Check if the product already exists in the cart
      const existingCartItemIndex = existingCart.cartItems.findIndex(
        (item) => item.product === req.body.cartItems.product
      );

      console.log(existingCartItemIndex);

      if (existingCartItemIndex !== -1) {
        // If the product already exists, update its quantity

        console.log(existingCart.cartItems[existingCartItemIndex]._id);

        let newQuantity =
          existingCart.cartItems[existingCartItemIndex].quantity +
          req.body.cartItems.quantity;

        console.log(newQuantity);

        await CartItem.findByIdAndUpdate(
          existingCart.cartItems[existingCartItemIndex]._id,
          {
            quantity: newQuantity,
          }
        );
      } else {
        // If the product doesn't exist, add it to the cart
        const newCartItem = CartItem.create({
          product: req.body.cartItems.product,
          quantity: req.body.cartItems.quantity,
        });

        existingCart.cartItems.push((await newCartItem)._id);
      }

      // Calculate the total price of the cart
      //existingCart.totalPrice = calculateTotalPrice(existingCart.cartItems);

      // Save the updated cart
      //await existingCart.save();
      existingCart
        .save()
        .then((t) => t.populate("cartItems"))
        .then((x) => res.json({ msg: "Cart updated successfully", cart: x }));
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Function to calculate the total price of the cart based on cart items
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (const item of cartItems) {
    // You can calculate the total price based on product prices or any other logic specific to your application
    totalPrice += item.product.price * item.quantity;
  }
  return totalPrice;
}

//get a cart of an user

router.get("/userCart/:userID", async (req, res) => {
  const user = req.params.userID;

  const getUserCart = await Cart.find({ userID: user });

  if (getUserCart.length == 0) {
    res.json({ msg: "No Cart found" });
  } else {
    res.json(getUserCart);
  }
});

//new cart creation
router.post("/createCart", async (req, res) => {
  const newCartItemsIDs = Promise.all(
    req.body.cartItems.map(async (cartItem) => {
      const newCartItems = new CartItem({
        product: cartItem.product,
        quantity: cartItem.quantity,
      });

      await newCartItems.save();

      return newCartItems._id;
    })
  );

  const newCartItemsIDsResolved = await newCartItemsIDs;

  try {
    const newCart = new Cart({
      userID: req.body.userID,
      cartItems: newCartItemsIDsResolved,
      totalPrice: req.body.totalPrice,
    });

    newCart.save();

    res.json(newCart);
  } catch (error) {
    res.json({ msg: error });
  }
});

module.exports = router;
