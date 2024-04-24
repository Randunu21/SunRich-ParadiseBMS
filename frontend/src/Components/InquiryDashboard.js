import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const QualityManagerTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Inquiry/"); // Assuming the API endpoint
        setInquiries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Inquiry Title</th>
          <th>Inquiry Body</th>
          <th>Reply</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <tr key={inquiry._id}>
            <td>{inquiry.name}</td>
            <td>{inquiry.email}</td>
            <td>{inquiry.inquiryTitle}</td>
            <td>{inquiry.inquiryBody}</td>
            <td>
              <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                <input
                  type="text"
                  name="reply"
                  placeholder="Enter Reply"
                 
                />
                <button type="button" >
                  Reply
                </button>
              </form>
            </td>
            <td>
              {/* Add your edit and delete button logic here */}
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QualityManagerTable;