const express = require("express");
const EmployeeModel = require("../models/EmployeeModel.js");
const {default: mongoose} = require("mongoose");


// Create a function to create a new employee
const addEmployees = async (req, res) =>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const NIC = req.body.NIC
    const role = req.body.role
    const gender = req.body.gender
    const DOB = req.body.DOB
    const contactNo = req.body.contactNo
    const email = req.body.email
    const address = req.body.address
    const joinedDate = req.body.joinedDate


    console.log(firstName + lastName + NIC + role + gender + DOB + contactNo + email + address + joinedDate )

    const employee = new EmployeeModel({

        userId: "45821463#23669546",
        firstName: firstName,
        lastName: lastName,
        NIC: NIC,
        role: role,
        gender: gender,
        DOB: DOB,
        contactNo: contactNo,
        email: email,
        address: address,
        joinedDate: joinedDate
    });

    try {
        await employee.save()
        console.log("successfully data inserted")
        res.status(200).send("Data inserted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting data");
    }
}

// Export all the controller functions as an object
module.exports = { addEmployees};