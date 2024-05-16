//reportGen.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2pdf from 'html2pdf.js';

export default function Report() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [filteredDeletedUsers, setFilteredDeletedUsers] = useState([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [filteredRegisteredUsers, setFilteredRegisteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchTotalRegisteredUsers();
    fetchRegisteredUsers();
    fetchDeletedUsers();
  }, [startDate, endDate]);

  const fetchDeletedUsers = async () => {
    try {
      let url = 'http://localhost:4000/api/users/deleted-users';
      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().substr(0, 10);
        const formattedEndDate = endDate.toISOString().substr(0, 10);
        url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setDeletedUsers(data);
        setFilteredDeletedUsers(data);
      } else {
        setError('Error fetching deleted users');
      }
    } catch (error) {
      setError('Error fetching deleted users');
    }
  };

  const fetchTotalRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/total-registered-users');
      if (response.ok) {
        const data = await response.json();
        setTotalRegisteredUsers(data.totalUsers);
      } else {
        setError('Error fetching total registered users');
      }
    } catch (error) {
      setError('Error fetching total registered users');
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      let url = 'http://localhost:4000/api/users';
      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().substr(0, 10);
        const formattedEndDate = endDate.toISOString().substr(0, 10);
        url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const sortedUsers = data.sort((a, b) => a.username.localeCompare(b.username));
        setRegisteredUsers(sortedUsers);
        setFilteredRegisteredUsers(sortedUsers);
      } else {
        setError('Error fetching registered users');
      }
    } catch (error) {
      setError('Error fetching registered users');
    }
  };

  const handleRegisteredUsersFilter = () => {
    const filteredUsers = registeredUsers.filter(user => {
      const userDate = new Date(user.createdAt).getTime();
      return userDate >= startDate.getTime() && userDate <= endDate.getTime();
    });
    setFilteredRegisteredUsers(filteredUsers);
  };

  const handleDeletedUsersFilter = () => {
    const filteredUsers = deletedUsers.filter(user => {
      const userDate = new Date(user.createdAt).getTime();
      return userDate >= startDate.getTime() && userDate <= endDate.getTime();
    });
    setFilteredDeletedUsers(filteredUsers);
  };

  const handlePrint = () => {
    const printableContent = document.getElementById('printable-tables').innerHTML;
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalBody;
  };

  const handleDownload = () => {
    const printableContent = document.getElementById('printable-tables');
    html2pdf(printableContent, {
      filename: 'user_data.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  };

  return (
    <div className='container'>
      <h2 className='mt-3'>Filter Users by Date</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="startDate" className="form-label">Start Date:</label>
          <input type="date" className="form-control" id="startDate" value={startDate ? startDate.toISOString().substr(0, 10) : ''} onChange={(e) => setStartDate(new Date(e.target.value))} />
        </div>
        <div className="col-md-4">
          <label htmlFor="endDate" className="form-label">End Date:</label>
          <input type="date" className="form-control" id="endDate" value={endDate ? endDate.toISOString().substr(0, 10) : ''} onChange={(e) => setEndDate(new Date(e.target.value))} />
          </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary mt-3" onClick={handleRegisteredUsersFilter}>Filter Users</button>
        </div>
        {/* <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary mt-3" onClick={handleDeletedUsersFilter}>Filter Deleted</button>
        </div> */}
      </div>

      <h2>Total Registered Users: {totalRegisteredUsers !== null ? totalRegisteredUsers : 'Loading...'}</h2>
      {error && <p className="text-danger">{error}</p>}

      <div id="printable-tables">
        <h2>Registered Users</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegisteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.address}</td>
                <td>{user.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Deleted Users</h2>
        <table className='table table-primary'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeletedUsers.map(deletion => (
              <tr key={deletion._id}>
                <td>{deletion.userId ? deletion.userId.username : 'User data not available'}</td>
                <td>{deletion.userId ? deletion.userId.email : 'User data not available'}</td>
                <td>{deletion.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary me-2 no-print" onClick={handlePrint}>Print</button>
        <button className="btn btn-primary no-print" onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}