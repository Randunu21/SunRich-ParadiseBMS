const supplierOrder=require("./backend/models/supplierOrder");

const getAllSupplierOrders=async(req,res,next)=>{

    let supplierorder;

    //get all supplier orders
    try{
        supplierorder=await supplierOrder.find();
    }catch(err){
        console.log(err);
    }

    //not found
    if(!supplierorder){
        return res.status(404).json({message:"Supplier orders not found"});
    }

    //display all supplier orders
    return res.status(200).json({supplierorder});
};

exports.getAllSupplierOrders=getAllSupplierOrders;