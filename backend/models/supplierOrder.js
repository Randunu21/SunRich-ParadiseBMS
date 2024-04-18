const mongoose=require('mongoose');

const supplierOrderSchema=new mongoose.Schema({

    supplier_name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Supplier',
        required:true
    },
    ordered_date:{
        type:Date,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    },
    order_status:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("supplierOrder",supplierOrderSchema);