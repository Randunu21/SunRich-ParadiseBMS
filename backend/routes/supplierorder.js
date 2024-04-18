const router=require("express").Router();
let supplierorder = require("../models/supplierorder");

router.route("/add").post((req,res)=>{

    const ordered_dateNew=req.body.ordered_dateNew;
    const due_dateNew=req.body.due_dateNew;
    const order_statusNew=req.body.order_statusNew;
    const quantityNew=req.body.quantityNew;
    const amountNew=req.body.amountNew;

    const newSupplierOrder=new supplierorder({

        ordered_date:ordered_dateNew,
        due_date:due_dateNew,
        order_status:order_statusNew,
        quantity:quantityNew,
        amount:amountNew
    })

    newSupplierOrder.save().then(()=>{
        res.json({msg:"Supplier order added"})
    }).catch((error)=>{
        console.log(error);
    })
})

router.route("/").get((req,res)=>{

    supplierorder.find().then((supplierorder)=>{
        res.json(supplierorder)
    }).catch((error)=>{
        console.log(error)
    })
})

module.exports=router;