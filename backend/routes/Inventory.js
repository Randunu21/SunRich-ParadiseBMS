const router = require("express").Router();
let Inventory = require("../models/Inventory");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.route("/add").post((req,res)=>{

    const code = req.body.code;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const quantity = Number(req.body.quantity);
    const supplier = req.body.supplier;
    const createdAt = req.body.createdAt;

    const newInventory= new Inventory({
        code,
        name,
        description,
        category,
        quantity,
        supplier,
        createdAt
    });

    newInventory.save()
        .then(() => {
            res.json("Item Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/").get((req,res)=>{
    Inventory.find()
        .then((inventories)=>{
            res.json(inventories);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/update/:id").put(async (req,res) => {
    let inventoryID = req.params.id;
    const { code, name, description, category, quantity, supplier,createdAt } = req.body;
    const updateInventory = {
        code,
        name,
        description,
        category,
        quantity,
        supplier,
        createdAt
    };
    try {
        const update = await Inventory.findByIdAndUpdate(inventoryID, updateInventory);
        res.status(200).send({ status: "Inventory updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req,res) => {
    let code= req.params.id;
    try {
        await Inventory.findByIdAndDelete(code);
        res.status(200).send({ status : "inventory deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status :"Error with delete inventory" });
    }
});

router.route("/get/:id").get(async (req,res) => {
    let code = req.params.id;
    try {
        const inventory = await Inventory.findById(code);
        res.status(200).send({ status: "Inventory Fetched", inventory });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get inventory", error: err.message });
    }
});

module.exports = router;