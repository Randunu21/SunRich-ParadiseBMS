const router=require("express").Router();
let Supplier=require("../models/Supplier");

router.route("/add").post((req,res)=>{

    const supplier_nameNew=req.body.supplier_name;
    const nicNew=req.body.NIC;
    const emailNew=req.body.email;
    const addressNew=req.body.address;
    const phone_numberNew=req.body.phone_number
    const materialNew=req.body.phone_number

    const newSupplier=new Supplier({

        name:supplier_nameNew,
        NIC:nicNew,
        email:emailNew,
        address:addressNew,
        contact:phone_numberNew,
        material:materialNew,
    })

    newSupplier.save().then(()=>{
        res.json({msg:"Supplier added"})
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

router.route("/:userId").put(async (req, res) => {
    const { userId } = req.params;
    const { supplier_name, nic, email, address, phone_number, material } = req.body;

    try {
        // Construct updated supplier object
        const updatedSupplier = {
            supplier_name,
            nic,
            email,
            address,
            phone_number,
            material
        };

        // Update supplier in the database
        const updatedUser = await Supplier.findByIdAndUpdate(userId, updatedSupplier, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ status: "Error", message: "Supplier not found" });
        }

        res.status(200).send({ status: "Success", message: "Supplier updated successfully", user: updatedUser });

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

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


router.route("/get/:supplierId").get(async (req, res) => {
    try {
        let userId = req.params.supplierId;

        const user = await Supplier.findById(userId);

        if (!user) {
            return res.status(404).send({ status: "Error", message: "User not found" });
        }

        res.status(200).send({ status: "User fetched", user: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error with get user", error: error.message });
    }
});


module.exports=router;
