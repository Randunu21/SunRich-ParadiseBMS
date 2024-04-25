import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EmployeeAdvanceForm from '../../Components/EmployeeAdvanceForm';

const PayrollPortal = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    
      const authResponse = await axios.post('http://localhost:4000/api/users/payportallogin', { userId, password });
      const authToken = authResponse.data.token;
      axios.defaults.headers.common['Authorization'] = authToken;

      const payrollResponse = await axios.get(`http://localhost:4000/api/incomes/calculatedsalary/${userId}`);
      const payrollData = payrollResponse.data;

      setUserDetails({ ...payrollData });
      setError('');
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Invalid User ID or Password');
    }
  };

  return (
    <div>
      <div>
        <button type="button" class="btn">
          <Link to="/dash" className="btn">
            <i className="bi bi-arrow-left-circle fs-5"></i> Return to profile page
          </Link>
        </button>
      </div>
      <div className="container">
        <h1 className="mt-4 mb-4">Employee Payroll Portal</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginBottom: '20px' }}>
            Login
          </button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
        {userDetails && (
          <div className="container" tabIndex="-1" role="dialog" style={{ display: 'block', border: '1px solid #000', borderRadius: '10px' }}>
            <div style={{ marginTop: '50px' }}>
              <div className="modal-content">
                <div className="modal-header" style={{ marginBottom: '20px' }}>
                  <p className="modal-title">Your salary detail for {userDetails.month} </p>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <div className="card">
                          <div className="card-body">

                            <p className="card-text"><strong>Employee ID: </strong>{userDetails.userId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text"><strong>Username: </strong>{userDetails.username}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text"><strong>Designation: </strong>{userDetails.employeeType}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <p className="card-text"><strong>Month: </strong>{userDetails.month}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="card">
                          <div className="card-body">

                            <p className="card-text"><strong>Basic Salary: </strong>{userDetails.basicSalary}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="additional-bonuses border p-3 rounded mb-3 mt-3">
                          <p><strong>Additions:</strong></p>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Details</th>
                                <th scope="col" style={{ width: '20%' }}>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userDetails.additionalBonuses.map((bonus, index) => (
                                <tr key={index}>
                                  <td>{bonus.detail}</td>
                                  <td>{bonus.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="general-deductions border p-3 rounded mb-3">
                          <p><strong>Deductions:</strong></p>
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Details</th>
                                <th scope="col" style={{ width: '20%' }}>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userDetails.generalDeductions.map((deduction, index) => (
                                <tr key={index}>
                                  <td>{deduction.detail}</td>
                                  <td>{deduction.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <div className="net-salary border p-3 rounded mb-3">
                          <p><strong>Net Salary:</strong> {userDetails.baseSalary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <EmployeeAdvanceForm />
      </div>

    </div>

  );
};

export default PayrollPortal;
