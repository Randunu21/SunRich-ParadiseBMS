const Supplier=require("../models/Supplier");

const getAllSuppliers=async(req,res,next)=>{

    let suppliers;

    //get all suppliers
    try{
        suppliers=await Supplier.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!suppliers){
        return res.status(404).json({message:"supplier not found"});
    }

    //Display all suppliers
    return res.status(200).json({suppliers});
};

exports.getAllSuppliers=getAllSuppliers;



