const mongoose = require('mongoose');

const employeeAttendanceSchema = new mongoose.Schema({

   employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  NIC: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

module.exports = EmployeeAttendance;
