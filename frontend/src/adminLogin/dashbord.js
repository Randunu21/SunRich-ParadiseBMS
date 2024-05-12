import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(null); // Set to null initially
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeletedUsers();
    fetchTotalRegisteredUsers(); // Fetch total registered users on component mount
    fetchRegisteredUsers(); // Fetch registered users on component mount
  }, []);

  const fetchDeletedUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/deleted-users');
      if (response.ok) {
        const data = await response.json();
        setDeletedUsers(data);
      } else {
        setError('Error fetching deleted users');
      }
    } catch (error) {
      setError('Error fetching deleted users');
    }
  };

  const fetchTotalRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/total-registered-users');
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
      const response = await fetch('http://localhost:5000/api/users');
      if (response.ok) {
        const data = await response.json();
        // Sort registered users alphabetically by username
        const sortedUsers = data.sort((a, b) => a.username.localeCompare(b.username));
        setRegisteredUsers(sortedUsers);
      } else {
        setError('Error fetching registered users');
      }
    } catch (error) {
      setError('Error fetching registered users');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className="card bg-success text-white mb-3">
            <div className="card-body" style={{ backgroundColor: '#4B9CD3'}}>
              <h5 className="card-title">Total Registered User</h5>
              <p className="card-text">
                {totalRegisteredUsers !== null ? (
                  <span style={{ color: 'black' }}>{totalRegisteredUsers} users registered</span>
                ) : (
                  '0 users registered'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className='mt-3'>Deleted Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Email</th> {/* Added Email column */}
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {deletedUsers.map((user, index) => (
            <tr key={user?._id} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <td>{user?.email}</td> {/* Displaying user email */}
              <td>{user?.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className='mt-3'>Registered Users</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {registeredUsers.map((user, index) => (
            <tr key={user?._id} className={index % 2 === 0 ? 'table-primary' : 'table-secondary'}>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.name}</td>
              <td>{user?.age}</td>
              <td>{user?.gender}</td>
              <td>{user?.address}</td>
              <td>{user?.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
