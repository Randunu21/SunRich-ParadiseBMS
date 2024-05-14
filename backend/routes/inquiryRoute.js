const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const Inquiry = require("../models/inquiry");


// Route to retrieve inquiries with only title and body
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({},{ inquiryTitle: 1, inquiryBody: 1 }); // Select only desired fields
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving inquiries' });
  }
});

//add inquiry
router.route("/add").post((req, res) => {
    const name= req.body.name;
    const email=req.body.email;
    const inquiryTitle=req.body.inquiryTitle;
    const inquiryBody=req.body.inquiryBody;

    const newInquiry = new Inquiry({
        name,
        email,
        inquiryTitle,
        inquiryBody
    });

    newInquiry.save()
        .then(() => {
            res.json("Inquiry added");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        })
})
//retrieve inquiry
router.route("/").get((req, res) => {
    Inquiry.find()
      .then((inquiries) => {
        res.json(inquiries);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error fetching inquiries", error: err.message });
      });
  });
  
//update inquiry

router.route("/update/:id").put(async (req, res) => {
    let inquiryId = req.params.id;
    const { name, email, inquiryTitle, inquiryBody } = req.body; // Changed 'request.body' to 'req.body'
    const updateInquiry = {
        name,
        email,
        inquiryTitle,
        inquiryBody
    };
    const update = await Inquiry.findByIdAndUpdate(inquiryId, updateInquiry)
        .then(() => {
            res.status(200).send({ status: "inquiry updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error with updating data" });
        });
});

//delete inquiry
router.route("/delete/:id").delete(async(req,res)=>{
    let inquiryId=req.params.id;
    await Inquiry.findByIdAndDelete(inquiryId)
    .then(()=>{
        res.status(200).send({status:"inquiry deleted"});

    }).catch((err)=>{
        res.status(500).send({status:"error with deleting the inquiry",error:err.messsage})
    })
})
//fetch details of one inquiry

router.route("/get/:id").get(async (req, res) => {
    let inquiryId = req.params.id;
    try {
        const inquiry = await Inquiry.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).send({ status: "error", message: "inquiry not found" });
        }
        res.status(200).send({ status: "success", inquiry: inquiry });
    } catch (err) {
        res.status(500).send({ status: "error", message: "Error fetching data", error: err.message });
    }
});
// Route to retrieve admin inquiry report
router.get('/get-inquiries', async (req, res) => {
    try {
      const inquiries = await Inquiry.find({}, { name: 1, email: 1, inquiryTitle: 1, inquiryBody: 1, createdAt: 1 }); // Select fields for the report
      res.json(inquiries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving admin inquiry report' });
    }
  });
  

// Route to fetch filtered inquiries based on date range
router.get("/inquiry/filter", async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const inquiries = await Inquiry.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching filtered inquiry data:", error);
    res.status(500).json({ message: "Error fetching filtered inquiry data" });
  }
});


module.exports=router;