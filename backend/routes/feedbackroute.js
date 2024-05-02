const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');

// Add feedback route
router.post("/add", (req, res) => {
  // Retrieve form data
  const { name, email, rating, reviewTitle } = req.body;

  // Create new feedback object
  const newFeedback = new Feedback({
    name,
    email,
    rating,
    reviewTitle
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

// Retrieve feedback route
router.get("/", (req, res) => {
    const productId = req.query.product_id;

    Feedback.find({ productId })
        .then((feedback) => {
            res.json(feedback);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching feedback." });
        });
});

// Update feedback route
router.put("/update/:id", async (req, res) => {
    const feedbackId = req.params.id;
  
    const { name, email, rating, reviewTitle, userId } = req.body;
  
    const updateFeedback = {
      name,
      email,
      rating,
      reviewTitle,
      userId
    };
  
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateFeedback);
      if (!updatedFeedback) {
        return res.status(404).send({ status: "error", message: "Feedback not found" });
      }
  
      res.status(200).send({ status: "Feedback updated", feedback: updatedFeedback });
    } catch (err) {
      console.error("Error updating feedback:", err);
      res.status(500).send({ status: "error", message: "Error updating feedback" });
    }
});

// Delete feedback route
router.delete("/delete/:id", async (req, res) => {
    const feedbackId = req.params.id;
    try {
        await Feedback.findByIdAndDelete(feedbackId);
        res.status(200).send({ status: "Feedback deleted" });
    } catch (err) {
        console.error("Error deleting feedback:", err);
        res.status(500).send({ status: "Error deleting feedback", error: err.message });
    }
});

module.exports = router;
