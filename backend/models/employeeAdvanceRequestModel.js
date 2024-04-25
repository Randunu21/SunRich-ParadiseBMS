// employeeAdvanceRequestModel.js

const mongoose = require('mongoose');

const employeeAdvanceRequestSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    advanceAmount: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    status: { 
        type: String, 
        default: 'Pending'
    } // Accepted, Rejected, or Pending
});

module.exports = mongoose.model('EmpAdvanceRequest', employeeAdvanceRequestSchema);
