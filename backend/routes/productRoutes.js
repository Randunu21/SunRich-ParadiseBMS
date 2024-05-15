const express = require("express");
const router = express.Router();
const Rating = require("../models/rating");
const Product = require("../models/products");
const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify destination directory for file uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

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

router.post("/addproduct", upload.single("productImage"), async (req, res) => {
  try {
    console.log(req.body);
    const product = await new Product({
      productID: req.body.productID,
      name: req.body.name,
      image: req.file.path, // Save the file path to the database
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Failed to add product" });
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
