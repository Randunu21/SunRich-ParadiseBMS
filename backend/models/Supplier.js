const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const supplierSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    NIC:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model("Supplier",supplierSchema);