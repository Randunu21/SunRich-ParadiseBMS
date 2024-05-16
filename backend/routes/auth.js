const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/User");
const Employee = require("../models/EmployeeModel");

// Function to generate JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
};

// Combined login route for both customers and employees
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in customers
    const customer = await Customer.findOne({ email });
    console.log(customer);
    if (customer) {
      console.log(customer.age);
      //const isPasswordMatch = await bcrypt.compare(password, customer.password);
      if (password == customer.password) {
        const token = generateAuthToken(customer);
        return res.json({
          token,
          userId: customer.userID,
          redirectTo: "/products/home",
        }); // Redirect to '/cuspage' for customers
      }
    }

    // Check if the email exists in employees
    const employee = await Employee.findOne({ email });
    if (employee) {
      const isPasswordMatch = await bcrypt.compare(password, employee.password);
      if (isPasswordMatch) {
        // Redirect based on employee role
        let redirectTo = "";
        switch (employee.role) {
          case "Admin":
            redirectTo = "/adminpage";
            break;
          case "Product Manager":
            redirectTo = "/pmanagerpage";
            break;
          case "Inventory Manager":
            redirectTo = "/imanagerpage";
            break;
          case "Supplier Manager":
            redirectTo = "/smanagerpage";
            break;
          default:
            redirectTo = "/employeepage"; // Default redirect for regular employees
            break;
        }
        const token = generateAuthToken(employee);
        return res.json({ token, redirectTo });
      }
    }

    // If neither customer nor employee is found
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const generateRandomNumbers = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

// Customer registration route
router.post("/customers/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const cusId = `CID${generateRandomNumbers()}`;

    // Create a new customer
    const newCustomer = new Customer({
      cusId,
      username,
      email,
      password: hashedPassword,
    });

    // Save the customer to the database
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Employee registration route
router.post("/employees/register", async (req, res) => {
  try {
    const { username, role, type, email, password } = req.body;

    // Check if the email is already registered
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const empId = `EID${generateRandomNumbers()}`;

    // Create a new employee
    const newEmployee = new Employee({
      empId,
      username,
      role,
      type,
      email,
      password: hashedPassword,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
