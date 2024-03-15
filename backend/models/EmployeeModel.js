
const  mongoose = require("mongoose");
// import autoIncrement from 'mongoose-auto-increment';

const Schema  = mongoose.Schema;

const EmployeeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    
    joinedDate: {
        type: Date,
        required: true
    },
    
    totalSal: {
        type: Number
    }
});

//Employee is collection name
module.exports = mongoose.model('Employee', EmployeeSchema);
