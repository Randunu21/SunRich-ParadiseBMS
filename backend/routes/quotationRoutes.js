const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const quotationModel = require("../models/quotationModel");

//get all routes
router.get("/getAllQuotations", async (req, res) => {
  const allQuotes = await quotationModel.find().populate({
    path: "cartID",
    populate: { path: "cartItems", model: "cartitem" },
  });

  if (!allQuotes) {
    res.json({ msg: "no quotations" });
  } else {
    res.json(allQuotes);
  }
});

//Read quotations of a user

router.get("/getQuotations/:userID", async (req, res) => {
  const specQuotations = await quotationModel
    .find({ userID: req.body.userID })
    .populate({
      path: "cartID",
      populate: { path: "cartItems", model: "cartitem" },
    });

  if (!specQuotations) {
    res.json({ msg: "No Quotations " });
  } else {
    res.json(specQuotations);
  }
});

//Update Quotation
router.patch("/updateQuotation/:id", async (req, res) => {
  const quotationID = req.params.id;

  const updatedQuotes = await quotationModel.findByIdAndUpdate(quotationID, {
    price: req.body.cartID.cartItems.price,
    totalPrice: req.body.totalPrice,
    reply: req.body.reply,
  });

  if (updatedQuotes) {
    res.json(updatedQuotes);
  } else {
    res.json({ msg: "Quote update failed" });
  }
});

//Create quotations
router.post("/addQuotation", async (req, res) => {
  const newQuotation = new quotationModel({
    cartID: req.body.cartID,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    postalCode: req.body.postalCode,
    status: req.body.status,
    userID: req.body.userID,
    email: req.body.email,
    dateOfOrder: req.body.dateOfOrder,
  });

  newQuotation
    .save()
    .then(() => {
      res.json({ msg: "quotation Added to the System" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete quotations
router.delete("/deleteQuotation/:id", async (req, res) => {
  const quotationID = req.params.id;

  try {
    const deletedQuotation = await quotationModel.findByIdAndDelete(
      quotationID
    );

    if (deletedQuotation) {
      res.json(deletedQuotation);
    } else {
      res.json({ msg: "couldn't delete the quotation" });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "internal server error" });
  }
});

//get a specific quotation
router.get("/getQuotation/:id", async (req, res) => {
  const quotationID = req.params.id;

  const specQuotations = await quotationModel.findById(quotationID).populate({
    path: "cartID",
    populate: { path: "cartItems", model: "cartitem" },
  });

  if (!specQuotations) {
    res.json({ msg: "quotation not found" });
  } else {
    res.json(specQuotations);
  }
});

module.exports = router;
