const express = require("express");
const { addEmployees, removeEmp, updateEmp, readSpecemployee, fetchEmployees } = require('../controller/EmployeeController.js');

const router = express.Router();

console.log('IN employeeRouter');

// create an employee
router.post('/addEmployee', addEmployees);

// get all employees
router.get('/getEmployee', fetchEmployees);

// get one employee by id
router.get('/getEmployee/:id', readSpecemployee);

// update an employee by id
router.put('/updateEmployee/:id', updateEmp);

module.exports=router;