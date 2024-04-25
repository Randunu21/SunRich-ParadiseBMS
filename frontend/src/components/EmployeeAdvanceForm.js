// EmployeeAdvanceForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeAdvanceForm = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        employeeID: '',
        advanceAmount: '',
        detail: '',
        userID: '' // Include userID in form data
    });
    const [requestDetails, setRequestDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserRequest = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/incomes/advance-request/${formData.userID}`);
                setRequestDetails(res.data);
            } catch (error) {
                console.error(error.response.data);
                setError('Failed to fetch request details');
            }
        };
        if (formData.userID) {
            fetchUserRequest();
        }
    }, [formData.userID]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/incomes/advance-request', formData);
            console.log(res.data);
            setRequestDetails(res.data);
        } catch (error) {
            console.error(error.response.data);
            setError(error.response.data.msg);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} placeholder="Employee Name" />
                    <input type="text" name="employeeID" value={formData.employeeID} onChange={handleChange} placeholder="Employee ID" />
                    <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleChange} placeholder="Advance Amount" />
                    <input type="text" name="detail" value={formData.detail} onChange={handleChange} placeholder="Detail" />
                    {/* Add hidden input field to capture userID */}
                    <input type="hidden" name="userID" value={formData.userID} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {error && <p>{error}</p>}
            {requestDetails && (
                <div>
                    <p>Employee Name: {requestDetails.employeeName}</p>
                    <p>Employee ID: {requestDetails.employeeID}</p>
                    <p>Advance Amount: {requestDetails.advanceAmount}</p>
                    <p>Detail: {requestDetails.detail}</p>
                    <p>Status: {requestDetails.status}</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeAdvanceForm;
