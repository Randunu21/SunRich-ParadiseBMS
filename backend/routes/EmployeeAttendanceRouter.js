const express = require("express");
const router = express.Router();
const EmployeeAttendance = require("../models/EmployeeAttendanceModel");
const Employee = require("../models/EmployeeModel");

// Route to mark attendance
router.post("/mark-attendance", async (req, res) => {
  try {
    const { employeeId, fullName, NIC, Email } = req.body;
    const existingAttendance = await EmployeeAttendance.findOne({ employeeId, date: new Date().toISOString().split('T')[0] });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today" });
    }

    const newAttendance = new EmployeeAttendance({
      employeeId,
      fullName,
      NIC,
      Email,
      date: new Date() // sets to current date
    });

    await newAttendance.save();
    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in marking attendance", error });
  }
});



module.exports = router;
