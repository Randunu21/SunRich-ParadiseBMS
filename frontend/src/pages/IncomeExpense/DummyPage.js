import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DummyPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/incomes/advance-requests');
        setRequests(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:4000/api/incomes/advance-request/${id}`, { status });
      setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
        <h1>hello</h1>
      {requests.map((request) => (
        <div key={request._id}>
          <p>Employee Name: {request.employeeName}</p>
          <p>Employee ID: {request.employeeID}</p>
          <p>Advance Amount: {request.advanceAmount}</p>
          <p>Detail: {request.detail}</p>
          <p>Status: {request.status}</p>
          <button onClick={() => handleUpdateStatus(request._id, 'Accepted')}>Accept</button>
          <button onClick={() => handleUpdateStatus(request._id, 'Rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default DummyPage;
