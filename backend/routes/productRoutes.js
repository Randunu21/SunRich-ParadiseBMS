const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const Product = require("../models/products");

router.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});

    res.send(products);
  } catch (error) {
    res.json(error);
  }
});

router.get("/spices", async (req, res) => {
  try {
    let products = await Product.find({ category: "Spices Product" });

    console.log("spices");
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.get("/coconut", async (req, res) => {
  try {
    let products = await Product.find({ category: "Coconut Product" });
    console.log("coconut");
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.productID + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      productID: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/removeproduct/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log("Removed");
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.json(error);
  }
});

//get a certain product
router.get("/:id", async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findOne({ productID: productID });
    res.json(product);
  } catch (error) {
    res.send(error);
  }
});

//edit a certain product
router.patch("/:id", async (req, res) => {
  try {
    const { productID } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//rating
router.post("/rating", async (req, res) => {
  try {
    const { productID, ratingValue } = req.body;
    console.log(productID);
    console.log(ratingValue);

    const product = await Product.find({ productID });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const rating = await Rating.create({
      productID,
      ratingValue,
    });

    res.status(201).json({ success: true, data: rating });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/product/:productId/ratings", async (req, res) => {
  try {
    const { productID } = req.params;
    const ratings = await Rating.find({ productID });
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/rating/allRatings", async (req, res) => {
  try {
    const allRatings = await Rating.find({});

    res.json(allRatings);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
