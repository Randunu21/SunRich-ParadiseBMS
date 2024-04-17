const express = require('express')
const { default: mongoose } = require("mongoose");
const fs = require('fs');
const nodemailer = require('nodemailer');
const pdfkit = require('pdfkit');
const IncomesModel = require('../models/incomeModel');
const OrderModel = require('../models/orderModel');
const PayrollModel = require('../models/payrollModel');
const CalculatedSalaryModel = require('../models/calculatedSalaryModel');

const router = express.Router()


// Initialize change stream for Order collection
const orderChangeStream = OrderModel.watch();

// Set up listener for change events on Order collection
orderChangeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
        // When a new document is inserted into Order collection
        try {
            const { _id, totalPrice } = change.fullDocument;
            // Insert new document into Income collection with formatted date and amount
            await IncomesModel.create({
                detail: `Customer Order - Order ID: ${_id}`,
                amount: totalPrice,
                type: 'Income',
                category: 'Customer Order'
            });

            console.log('New order detail added to Income collection:', change.fullDocument);
        } catch (error) {
            console.error('Error inserting order detail into Income collection:', error);
        }
    }
});


router.get('/totals', async (req, res) => {
    try {
        let filter = {};

        // Get the selected time frame from the query parameter
        const timeframe = req.query.timeframe || 'all';

        // Filter data based on the selected timeframe
        if (timeframe === 'thisMonth') {
            filter = {
                date: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            };
        } else if (timeframe === 'lastMonth') {
            filter = {
                date: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                    $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            };
        }

        const incomes = await IncomesModel.find(filter);
        let totalIncome = 0;
        let totalExpense = 0;

        incomes.forEach(income => {
            if (income.type === 'Income') {
                totalIncome += income.amount;
            } else if (income.type === 'Expense') {
                totalExpense += income.amount;
            }
        });

        const profit = totalIncome - totalExpense;

        res.json({
            totalIncome,
            totalExpense,
            profit
        });
    } catch (error) {
        console.error('Error calculating totals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Get transaction data summary per day
router.get('/daily-totals', async (req, res) => {
    try {
        let pipeline = [];

        // Get the selected time frame from the query parameter
        const timeframe = req.query.timeframe || 'all';

        // Filter data based on the selected timeframe
        if (timeframe === 'thisMonth') {
            pipeline = [
                {
                    $match: {
                        date: {
                            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                        }
                    }
                }
            ];
        } else if (timeframe === 'lastMonth') {
            pipeline = [
                {
                    $match: {
                        date: {
                            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                            $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                        }
                    }
                }
            ];
        }

        pipeline.push(
            {
                $group: {
                    _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
                    totalIncome: { $sum: { $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0] } },
                    totalExpense: { $sum: { $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0] } },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
            }
        );

        const dailyTotals = await IncomesModel.aggregate(pipeline);
        const formattedData = dailyTotals.map((data) => ({
            date: `${data._id.year}-${String(data._id.month).padStart(2, '0')}-${String(data._id.day).padStart(2, '0')}`,
            income: data.totalIncome,
            expense: data.totalExpense,
            profit: data.totalIncome - data.totalExpense,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching daily totals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//get all transactions
router.get('/trans', async (req, res) => {
    await IncomesModel.find()
        .sort({ date: -1 })
        .then((incomes) => {
            res.json(incomes);
        }).catch((error) => {
            console.log(error);
        })
})

//get single transaction
router.get('/trans/:id', async (req, res) => {
    const incomeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(incomeId)) {
        res.status(400).json({ msg: "Invalid id" });
    } else {
        const income = await IncomesModel.findById(incomeId);

        if (!income) {
            res.status(404).json({ msg: "IDs Not Found" });
        } else {
            res.status(200).json(income);
        }
    }
})

//add a new transaction
router.post('/trans/', async (req, res) => {

    const { date, detail, category, amount, type, } = req.body;

    const newIncome = new IncomesModel({
        date, detail, category, amount, type
    })

    await newIncome.save()
        .then(() => {
            res.json("Transaction Added");
        }).catch((error) => {
            console.log(error);
        })
})

//delete transaction
router.delete('/trans/:id', async (req, res) => {
    const incomeId = req.params.id;

    const deleteIncome = await IncomesModel.findByIdAndDelete(incomeId)

        .then(() => {
            res.status(200).send({ status: "Transaction Deleted" });
        }).catch((error) => {
            console.log(error.message)
            res.status(500).send({ status: "Error with delete Transaction", error: error.message })
        })

})

//update transaction
router.patch('/trans/:id', async (req, res) => {
    const incomeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(incomeId)) {
        return res.status(404).json({ error: 'No such Transaction' })
    }

    const income = await IncomesModel.findOneAndUpdate({ _id: incomeId }, {
        ...req.body
    })

    if (!income) {
        return res.status(400).json({ error: 'No such Transaction' })
    }

    res.status(200).json("Transaction Updated")

})


// Add Payroll Details
router.post('/addpayroll', async (req, res) => {
    try {
        const newpayroll = new PayrollModel(req.body);
        await newpayroll.save();
        res.status(201).json({ message: 'Payroll details added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Get All Payroll Details
router.get('/allpayrolls', async (req, res) => {
    try {
        const payrolls = await PayrollModel.find();
        res.status(200).json(payrolls);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

//get single payroll
router.get('/allpayrolls/:id', async (req, res) => {
    const payrollId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(payrollId)) {
        res.status(400).json({ msg: "Invalid id" });
    } else {
        const payroll = await PayrollModel.findById(payrollId);

        if (!payroll) {
            res.status(404).json({ msg: "IDs Not Found" });
        } else {
            res.status(200).json(payroll);
        }
    }
})

// Update Payroll Details
router.put('/updatepayroll/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPayroll = await PayrollModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPayroll) {
            return res.status(404).json({ message: 'Payroll not found' });
        }
        res.status(200).json({ message: 'Payroll details updated successfully', updatedPayroll });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a payroll entry
router.delete('/deletepayroll/:id', async (req, res) => {
    try {
        const deletedPayroll = await PayrollModel.findByIdAndDelete(req.params.id);
        if (!deletedPayroll) {
            return res.status(404).json({ message: 'Payroll entry not found' });
        }
        res.status(200).json({ message: 'Payroll entry deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Save Calculated Salaries
router.post('/savecalculatedsalaries', async (req, res) => {
    try {
        const calculatedSalaries = req.body;
        const savedSalaries = [];

        for (const salary of calculatedSalaries) {
            // Check if a record with the same userId already exists
            const existingSalary = await CalculatedSalaryModel.findOne({ userId: salary.userId });

            if (!existingSalary) {
                // If the record doesn't exist, save it
                const newCalculatedSalary = new CalculatedSalaryModel(salary);
                await newCalculatedSalary.save();
                savedSalaries.push(newCalculatedSalary);
            } else {
                // If the record already exists, skip saving and continue to the next salary
                console.log(`Salary with userId ${salary.userId} already exists.`);
            }
        }

        res.status(201).json({ message: 'Calculated salaries saved successfully', savedSalaries });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

//get all calculated salaries
router.get('/allempsal', async (req, res) => {
    try {
        const salaries = await CalculatedSalaryModel.find();
        res.status(200).json(salaries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get Single Calculated Salary
router.get('/calculatedsalary/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const salary = await CalculatedSalaryModel.findOne({ userId });
        res.status(200).json(salary);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update Calculated Salaries
router.put('/updatecalculatedsalaries', async (req, res) => {
    try {
        const { userIds, additionalBonuses, generalDeductions } = req.body;

        // Update the salaries for the selected users
        for (const userId of userIds) {
            // Find the calculated salary by userId
            const calculatedSalary = await CalculatedSalaryModel.findOne({ userId });

            if (calculatedSalary) {
                // Update additional bonuses and general deductions
                calculatedSalary.additionalBonuses.push(...additionalBonuses);
                calculatedSalary.generalDeductions.push(...generalDeductions);

                // Calculate the new base salary
                let baseSalary = calculatedSalary.baseSalary;
                for (const bonus of additionalBonuses) {
                    baseSalary += bonus.amount;
                }
                for (const deduction of generalDeductions) {
                    baseSalary -= deduction.amount;
                }

                // Update the base salary
                calculatedSalary.baseSalary = baseSalary;

                // Save the updated calculated salary
                await calculatedSalary.save();
            } else {
                console.log(`No calculated salary found for userId: ${userId}`);
            }
        }

        res.status(200).json({ message: 'Calculated salaries updated successfully' });
    } catch (error) {
        console.error('Error updating calculated salaries:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete all data entries in the CalculatedSalary collection
router.delete('/clearcalculatedsalaries', async (req, res) => {
    try {
        await CalculatedSalaryModel.deleteMany({});
        res.status(200).json({ message: 'All data entries in CalculatedSalary collection deleted successfully' });
    } catch (error) {
        console.error('Error clearing calculated salaries:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.post('/sendpayrolls', async (req, res) => {
    try {
        const usersData = await CalculatedSalaryModel.find();

        // Create an array to store promises for sending emails
        const emailPromises = usersData.map(async (userData) => {
            const doc = new pdfkit();

            doc.fontSize(20).text(`Employee Pay Sheet`, { align: 'center', underline: true }).moveDown(2);
            doc.fontSize(13).text(`~ Username: ${userData.username}`).moveDown(); 
            doc.fontSize(13).text(`~ Employee ID: ${userData.userId}`).moveDown();
            doc.fontSize(13).text(`~ Email: ${userData.email}`).moveDown();
            doc.fontSize(13).text(`~ Employee Type: ${userData.employeeType}`).moveDown();
            doc.fontSize(13).text(`~ Month: ${userData.month}`).moveDown();
            doc.fontSize(13).text(`~ Basic Salary: ${userData.basicSalary} /=`).moveDown(2);

            doc.fontSize(14).text('~ Additions:', { underline: true }).moveDown();
            for (const bonus of userData.additionalBonuses) {
                doc.fontSize(12).text(`• ${bonus.detail}: ${bonus.amount}`).moveDown(0.5);
            }
            doc.moveDown();

            doc.fontSize(14).text('~ Deductions:', { underline: true }).moveDown();
            for (const deduction of userData.generalDeductions) {
                doc.fontSize(12).text(`• ${deduction.detail}: ${deduction.amount}`).moveDown(0.5);
            }
            doc.moveDown();

            doc.fontSize(14).text(`~ Net Salary: ${userData.baseSalary} /=`).moveDown();

            doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke();

            const pdfBuffer = await new Promise((resolve, reject) => {
                const buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    resolve(Buffer.concat(buffers));
                });
                doc.end();
            });

            // Send email with attached PDF buffer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sunrichprivatelimited@gmail.com',
                    pass: 'xejf awev mece mwvd'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: 'sunrichprivatelimited@gmail.com',
                to: userData.email,
                subject: 'Your Pay Slip',
                text: 'Please find the attached pay slip.',
                attachments: [
                    {
                        filename: `${userData.username}_payroll.pdf`,
                        content: pdfBuffer
                    }
                ]
            };

            await transporter.sendMail(mailOptions);
            console.log(`Payroll sent to ${userData.email}`);
        });

        // Wait for all emails to be sent
        await Promise.all(emailPromises);

        res.status(200).json({ message: 'Payrolls sent successfully' });
    } catch (error) {
        console.error('Error sending payrolls:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});



//linebar logic
router.get('/summary', async (req, res) => {
    try {
        const incomes = await IncomesModel.find({ type: 'Income' });
        const expenses = await IncomesModel.find({ type: 'Expense' });

        const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
        const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

        const incomeCategories = {};
        const expenseCategories = {};

        incomes.forEach(income => {
            if (!incomeCategories[income.category]) {
                incomeCategories[income.category] = income.amount;
            } else {
                incomeCategories[income.category] += income.amount;
            }
        });

        expenses.forEach(expense => {
            if (!expenseCategories[expense.category]) {
                expenseCategories[expense.category] = expense.amount;
            } else {
                expenseCategories[expense.category] += expense.amount;
            }
        });

        const incomeCategoryPercentage = {};
        const expenseCategoryPercentage = {};
        const incomeCategoryColors = {
            'Sales Revenue': '#007bff',
            'Dividend Income': '#28a745',
            'Commissions': '#ffc107',
            'Other Incomes': '#dc3545',
            'Customer Order': '#6610f2'
        };
        const expenseCategoryColors = {
            'Utilities and Maintenance': '#007bff',
            'Supplier payments': '#28a745',
            'Operating Expenses': '#ffc107',
            'Other Expenses': '#dc3545',
            'Employee Payrolls': '#6610f2'
        };

        for (const category in incomeCategories) {
            incomeCategoryPercentage[category] = ((incomeCategories[category] / totalIncome) * 100).toFixed(2);
        }

        // Assigning percentages for expense categories
        for (const category in expenseCategories) {
            expenseCategoryPercentage[category] = ((expenseCategories[category] / totalExpense) * 100).toFixed(2);
        }

        const summary = {
            totalIncome,
            totalExpense,
            incomeCategories,
            expenseCategories,
            incomeCategoryPercentage,
            expenseCategoryPercentage,
            incomeCategoryColors,
            expenseCategoryColors
        };

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//calculate payrolls and add it to the income table
router.post('/addTotalEmployeePayroll', async (req, res) => {
    try {
        
        const calculatedSalaries = await CalculatedSalaryModel.find();
        const sumBaseSalary = calculatedSalaries.reduce((acc, curr) => acc + curr.baseSalary, 0);

        const newIncome = new IncomesModel({
            date: new Date(), // Current date
            detail: "Employee Payments",
            amount: sumBaseSalary,
            category: "Employee Payrolls",
            type: "Expense"
        });

        await newIncome.save();

        res.status(201).json({ message: 'Total employee payroll added successfully', total: sumBaseSalary });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router