const router = require("express").Router();
const Product = require("../models/product.js");
const mongoose = require("mongoose")

router.route("/add").post(async (req,res)=>{

      const productname = req.body.productname;
      const product_type = req.body.product_type;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const ratings = req.body.ratings;

      const newProduct = new Product({

        productname:productname,
        product_type:product_type,
        quantity:quantity,
        price:price,
        ratings:ratings,

      })

      newProduct.save().then(()=>{
        res.json({msg:"Product Added"})
      }).catch((err)=>{
        console.log(err);
      })
      
})

router.route("/").get((req,res)=>{

    Product.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:product_id").put(async(req,res) => {
    let ProductId = req.params.product_id;
    const {productname, product_type, quantity, price} = req.body;

    const updateProduct = {
        productname,
        product_type,
        quantity,
        price
    }

    const update = await Product.findByIdAndUpdate(ProductId,updateProduct).then(() => {

    res.status(200).send({status: "Product updated", user: update})
}).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
})

})

router.route("/delete/:product_id").delete(async (req,res) => {
 let ProductId = req.params.product_id;

 await Product.findByIdAndDelete(ProductId).then(() => {
    res.status(200).send({status: "Product deleted"});
 }).catch((err) =>{
   console.log(err.message);
   res.status(500).send({status: "Error with delete product", error: err.message});
 })
})

router.route("/get/:product_id").get(async (req,res) => {
    let ProductId = req.params.product_id;
    await Product.findById(ProductId).then(() => {
        res.status(200).send({status: "Product fatched", Product: Product})

    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

// Add Rating Route
router.route("/add-rating/:product_id").put(async (req, res) => {
    try {
        const productId = req.params.product_id;
        const { rating } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "Product not found" });
        }

        // Update product ratings
        product.ratings = rating;
        await product.save();

        res.status(200).json({ status: "Rating added", product: product });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error adding rating", error: err.message });
    }
});

// Update Rating Route
router.route("/update-rating/:product_id").put(async (req, res) => {
    try {
        const productId = req.params.product_id;
        const rating  = req.body.ratings;

        console.log(rating)

        const product = await Product.findByIdAndUpdate(productId, { ratings: rating });
        if (!product) {
            return res.status(404).json({ status: "Product not found" });
        }

        res.status(200).json({ status: "Rating updated", product: product });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error updating rating", error: err.message });
    }
});

// Update Product Retrieval Route
router.route("/").get(async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error fetching products", error: err.message });
    }
});


module.exports = router;