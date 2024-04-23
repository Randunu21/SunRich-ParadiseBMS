import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(null); // Set to null initially
  const [registeredUsers, setRegisteredUsers] = useState([]);

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
        console.error('Error fetching deleted users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching deleted users:', error.message);
    }
  };

  const fetchTotalRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/total-registered-users');
      if (response.ok) {
        const data = await response.json();
        setTotalRegisteredUsers(data.totalUsers);
      } else {
        console.error('Error fetching total registered users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching total registered users:', error.message);
    }
  };

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (response.ok) {
        const data = await response.json();
        setRegisteredUsers(data);
      } else {
        console.error('Error fetching registered users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching registered users:', error.message);
    }
  };


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Registered User</h5>
              <p className="card-text">
                {totalRegisteredUsers !== null ? `${totalRegisteredUsers} users registered` : '0 users registered'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className='mt-3'>Deleted Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {deletedUsers.map(user => (
            <tr key={user?._id}>
              <td>{user?._id}</td>
              <td>{user?.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className='mt-3'>Registered Users</h2>
      <table className="table">
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
          {registeredUsers.map(user => (
            <tr key={user?._id}>
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
