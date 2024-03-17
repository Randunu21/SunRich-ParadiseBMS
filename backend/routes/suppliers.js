const router=require("express").Router();
let Supplier=require("../models/Supplier");

router.route("/add").post((req,res)=>{

    const supplier_name=req.body.supplier_name;
    const nic=req.body.nic;
    const email=req.body.email;
    const phone_number=Number(req.body.phone_number)

    const newSupplier=new Supplier({

        supplier_name,
        nic,
        email,
        phone_number
    })

    newSupplier.save().then(()=>{
        res.json("Supplier Added")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/").get((req,res)=>{

    Supplier.find().then((suppliers)=>{
        res.json(suppliers)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/update/:supplierId").put(async(req,res)=>{
    let userId=req.params.supplierId;
    const{supplier_name,nic,email,phone_number}=req.body;

    const updateSupplier={
        supplier_name,
        nic,
        email,
        phone_number
    }

    const update=await Supplier.findByIdAndUpdate(userId,updateSupplier)
    .then(()=>{
        res.status(200).send({status:"User updated",user:update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:supplierId").delete(async(req,res)=>{
    let userId=req.params.supplierId;

    await Supplier.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",erro:err.message});
    })
})

router.route("/get/:supplierId").get(async(req,res)=>{
    let userId=req.params.supplierId;
    const user=await Supplier.findById(userId)
    .then(()=>{
        res.status(200).send({status:"User fetched",user:user})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});
    })
})


module.exports=router;