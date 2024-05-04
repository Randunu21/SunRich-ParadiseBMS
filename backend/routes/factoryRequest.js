const FactoryRequest = require("../models/factoryRequest")
const Inventory = require("../models/Inventory")
const express = require("express")
const router = express.Router()


router.post("/addForm" , async (req , res) => {

    const code = req.body.code;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const requestDate = req.body.requestDate;
   

    const newFactoryRequest = new FactoryRequest({
        code,
        name,
        quantity,
        description,
        requestDate
        
    });

    await newFactoryRequest.save()
        .then(() => {
            res.json("FOrm added");
        })
        .catch((err) => {
            console.log(err);
        });

})


router.delete("/deleteForm/:id" , async (req , res) => {

    const formID = req.params.id

try{

    const deletedForm = await FactoryRequest.findByIdAndDelete(formID);

    if(deletedForm){
        res.json(deletedForm)
    }else{
        res.json({msg:"deletion failed"})
    }
}catch(err){

    console.error(err);
    res.status(500).json({error:"Internal Server Error"});
}

});


router.patch("/accept/:id" , async (req , res) => {

    const id = req.params.id

    const code = req.body.code;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const requestDate = req.body.requestDate;

    try{

    const product = await Inventory.findOne({code : code});

    console.log(product.id)

    if (product == null) {
        return res.status(404).json({ msg: "Product not found" });
    }

    if (product.quantity < quantity || product.quantity == null) {
        return res.status(400).json({ msg: "Insufficient stock quantity" });
    } else{
        const newQuantity = product.quantity - quantity;

        const updatedProduct = await Inventory.findByIdAndUpdate(product._id, { quantity: newQuantity });
        await FactoryRequest.findByIdAndUpdate(id, { status: "Accepted" });
    
        
    
        res.json({msg:"Form Accepted", updateQuantity: updatedProduct.quantity});
    

    }

   
}catch(err){

    console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }



});

module.exports = router;