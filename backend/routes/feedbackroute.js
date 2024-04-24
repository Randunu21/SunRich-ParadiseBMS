const multer = require("multer");
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Feedback = require("../models/feedbackModel");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  }
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Add feedback route with multer middleware for image uploads
router.route("/add").post(upload.single("image"), (req, res) => {
  // Retrieve other form data
  const { name, email, rating, reviewTitle } = req.body;

  // Retrieve uploaded image filename (if any)
  const image = req.file ? req.file.filename : null;

  // Create new feedback object
  const newFeedback = new Feedback({
    name,
    email,
    rating,
    reviewTitle,
    image // Add image field to feedback object
  });

 
  newFeedback.save()
    .then(() => {
      res.json("Feedback added successfully.");
    })
    .catch((err) => {
      console.error("Error adding feedback:", err);
      res.status(500).json({ error: "An error occurred while adding feedback." });
    });
});

//retrieve feedback
router.route("/").get((req, res) => {
    const productId = req.query.product_id; // Access product ID from URL query parameter

    Feedback.find({ product: productId }) // Filter by product ID
        .then((feedback) => {
            res.json(feedback);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching feedback." });
        });
});
//update feedback

router.route("/update/:id").put(async (req, res) => {
    let feedbackId = req.params.id;
  
    // Check for authorization (replace with your authentication logic)
    if (!req.isAuthenticated || req.user.userId !== req.body.userId) { // Example using req.user.userId
      return res.status(401).send({ status: "error", message: "Unauthorized" });
    }
  
    const { name, email, rating, reviewTitle, userId } = req.body; // Include userId for authorization
  
    let updateFeedback = {
      name,
      email,
      rating,
      reviewTitle,
      userId // Add userId for authorization
    };
  
    // Handle image upload (if applicable)
    if (req.file) {
      updateFeedback.image = req.file.filename; // Update image field
    }
  
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateFeedback);
      if (!updatedFeedback) {
        return res.status(404).send({ status: "error", message: "Feedback not found" });
      }
  
      res.status(200).send({ status: "feedback updated", feedback: updatedFeedback });
    } catch (err) {
      console.error("Error updating feedback:", err);
      res.status(500).send({ status: "error", message: "Error updating feedback" });
    }
  });

//delete feedback
router.route("/delete/:id").delete(async(req,res)=>{
    let feedbackId=req.params.id;
    await Feedback.findByIdAndDelete(feedbackId)
    .then(()=>{
        res.status(200).send({status:"feedback deleted"});

    }).catch((err)=>{
        res.status(500).send({status:"error with deleting the feedback",error:err.messsage})
    })
})
//fetch details of one feedback

router.route("/get/:id").get(async (req, res) => {
    let feedbackId = req.params.id;
    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).send({ status: "error", message: "Feedback not found" });
        }
        res.status(200).send({ status: "success", feedback: feedback });
    } catch (err) {
        res.status(500).send({ status: "error", message: "Error fetching data", error: err.message });
    }
});
module.exports=router;

