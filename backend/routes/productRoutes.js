const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const Product = require("../models/products");

router.get("/allproducts", async (req, res) => {
  let products = await Product.find({});

  res.send(products);
});

router.get("/spices", async (req, res) => {
  let products = await Product.find({ category: "spices" });

  console.log("spices");
  res.send(products);
});

router.get("/coconut", async (req, res) => {
  let products = await Product.find({ category: "coconut" });
  console.log("coconut");
  res.send(products);
});

router.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
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
});

router.delete("/removeproduct/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

//get a certain product
router.get("/:id", async (req, res) => {
  const productID = req.params.id;
  const product = await Product.findOne({ id: productID });
  res.json(product);
});

//edit a certain product
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
    const { productId, ratingValue } = req.body;
    console.log(productId);
    console.log(ratingValue);

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const rating = await Rating.create({
      productId,
      ratingValue,
    });

    res.status(201).json({ success: true, data: rating });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/product/:productId/ratings", async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await Rating.find({ productId });
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/ratings", async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
