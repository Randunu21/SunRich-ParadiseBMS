
const mongoose = require("mongoose")

const factoryRequest = mongoose.Schema({


    code:{
        type:String,
    },
    name: {
        type: String,
        required: true,
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should have more than 3 characters"],
      },
      
    quantity :{
        type:Number
    },

    description:{
        type:String
    },
    status:{

        type:String,
        default: "Processing",
    },
    requestDate: {
        type: String,
        default: new Date(),
      },
    

})

module.exports = mongoose.model("factoryrequest" , factoryRequest);