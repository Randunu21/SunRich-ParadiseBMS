const express = require('express');
const Reply = require('../models/reply'); // Assuming your reply model is in replyModel.js

const router = express.Router();

// Route to add a reply
router.post('/', async (req, res) => {
  const { inquiryId, reply } = req.body; // Extract inquiryId and reply from request body

  // Validate input (optional)
  if (!inquiryId || !reply) {
    return res.status(400).json({ message: 'Missing required fields (inquiryId, reply)' });
  }

  try {
    const newReply = new Reply({ inquiryid: inquiryId, reply });
    const savedReply = await newReply.save(); // Save the reply document
    res.json(savedReply); // Send the saved reply data back to the front-end
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving reply' });
  }
});

module.exports = router;