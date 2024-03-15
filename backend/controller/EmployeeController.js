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

// Create a function to read all employees
const fetchEmployees = async (req, res) => {

    const userId = "45821463#23669546";

    try {
        const employee = await EmployeeModel.find({ userId });
        res.status(200).json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}

// Create a function to read a single employee by id
const readSpecemployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        console.log('Employee read successfully for update');
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while retrieving data');
    }
}

// Create a function to update an employee by id
const updateEmp = async (req, res) => {
    const objectId = req.params.id;
    const { firstName, 
            lastName, 
            NIC, 
            role, 
            gender, 
            DOB, 
            contactNo, 
            email, 
            address, 
            joinedDate 
    } = req.body;

    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            objectId,
            {
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

            },
            { new: true }
        );
        res.status(200).send(updatedEmployee);
        console.log('Employee details updated successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while updating data');
    }
}

// Export all the controller functions as an object
module.exports = { addEmployees};