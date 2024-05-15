const mongoose = require("mongoose");
const express = require("express");

const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

const router = express.Router();

// Calculate the total price of the cart
// Function to calculate the total price of the cart based on cart items
const calculateTotalPrice = (cartItems) => {
  let totalPrice = 0;
  for (const item of cartItems) {
    // You can calculate the total price based on product prices or any other logic specific to your application
    totalPrice += item.price;
  }
  return totalPrice;
};

//get cart by an ID
router.get("/getCart/:id", async (req, res) => {
  const cartID = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(cartID)) {
      res.json({ msg: "invalid ID" });
    } else {
      const specCart = await Cart.findById(cartID).populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      });

      if (!specCart) {
        res.json({ msg: "You Dont Have A Cart Currently" });
      } else {
        res.json(specCart);
      }
    }
  } catch (error) {
    res.json(error);
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

//update items in the cart

router.patch("/updateCart/:id", async (req, res) => {
  console.log(req.data);
  const cartID = req.params.id;

  if (!cartID) {
    res.json({ msg: "No Cart Available" });
  } else {
    try {
      const existingCart = await Cart.findById(cartID).populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      });

      if (!existingCart) {
        return res.json({ msg: "Cart not found" });
      }

      // Check if the product already exists in the cart
      const existingCartItemIndex = existingCart.cartItems.findIndex(
        (item) => item.product._id == req.body.cartItems.product
      );

      if (existingCartItemIndex !== -1) {
        // If the product already exists, update its quantity

        let newQuantity =
          existingCart.cartItems[existingCartItemIndex].quantity +
          req.body.cartItems.quantity;

        let newPrice =
          existingCart.cartItems[existingCartItemIndex].price +
          req.body.cartItems.price;

        if (newQuantity == 0) {
          await CartItem.findByIdAndDelete(
            existingCart.cartItems[existingCartItemIndex]._id //newly added?
          );
        } else {
          await CartItem.findByIdAndUpdate(
            existingCart.cartItems[existingCartItemIndex]._id,
            {
              quantity: newQuantity,
              price: newPrice,
            }
          );
        }
      } else {
        // If the product doesn't exist, add it to the cart
        const newCartItem = CartItem.create({
          product: req.body.cartItems.product,
          quantity: req.body.cartItems.quantity,
          price: req.body.cartItems.price,
        });

        existingCart.cartItems.push((await newCartItem)._id);
      }
      await existingCart.save();

      const updatedCart = await Cart.findById(cartID).populate({
        path: "cartItems",
        populate: {
          path: "product",
        },
      });

      updatedCart.totalPrice = calculateTotalPrice(updatedCart.cartItems);

      // Save the updated cart
      //await existingCart.save();
      updatedCart
        .save()
        .then((t) =>
          t.populate({
            path: "cartItems",
            populate: {
              path: "product",
            },
          })
        )
        .then((x) => res.json({ cart: x }));
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//get a cart of an user

router.get("/userCart/:userID", async (req, res) => {
  const user = req.params.userID;

  try {
    const getUserCart = await Cart.findOne({ userID: user }).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });

    if (!getUserCart) {
      res.json({ msg: "No cart" });
    } else {
      res.json(getUserCart);
    }
  } catch (error) {
    res.json(error);
  }
});

//new cart creation
router.post("/createCart", async (req, res) => {
  try {
    const newCartItemsIDs = await Promise.all(
      req.body.cartItems.map(async (cartItem) => {
        const newCartItems = new CartItem({
          product: cartItem.product,
          quantity: cartItem.quantity,
          price: cartItem.price,
        });

        await newCartItems.save();

        return newCartItems._id;
      })
    );

    const newCartItemsIDsResolved = await newCartItemsIDs;

    const totalPrice = calculateTotalPrice(req.body.cartItems);

    const newCart = new Cart({
      userID: req.body.userID,
      cartItems: newCartItemsIDsResolved,
      totalPrice: totalPrice,
      status: req.body.status,
    });

    await newCart.save();

    const newCartResolved = await newCart.populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });

    res.json(newCartResolved);
  } catch (error) {
    res.json({ msg: error });
  }
});

//update cart status
router.patch("/updateCart/status/:id", async (req, res) => {
  const cartID = req.params.id;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartID, {
      status: req.body.status,
      type: req.body.type,
    });

    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.json({ msg: "couldnt update the status of the cart" });
    }
  } catch (error) {
    res.json({ error });
  }
});

// Backend route to delete an item from the cart
router.delete("/deleteItem/:cartID/:itemID", async (req, res) => {
  const { cartID, itemID } = req.params;

  try {
    // Find the cart by ID
    const cart = await Cart.findById(cartID);

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Check if the item exists in the cart
    const itemIndex = cart.cartItems.indexOf(itemID);
    if (itemIndex === -1) {
      return res.status(404).json({ msg: "Item not found in the cart" });
    }

    // Remove the item from the cart
    cart.cartItems.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    // delete the item from the CartItem collection if needed
    await CartItem.findByIdAndDelete(itemID);

    const updatedCart = await Cart.findById(cartID).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });

    updatedCart.totalPrice = calculateTotalPrice(updatedCart.cartItems);

    await updatedCart.save();

    const newCartResolved = await Cart.findById(cartID).populate({
      path: "cartItems",
      populate: {
        path: "product",
      },
    });

    res.json(newCartResolved);
  } catch (error) {
    console.error("Error deleting item from the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
