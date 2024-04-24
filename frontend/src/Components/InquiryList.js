
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const InquiriesTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Inquiry/inquiries"); // Assuming the API endpoint
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
          <th>Inquiry Title</th>
          <th>Inquiry Body</th>
          <th>Reply</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <tr key={inquiry._id}>
            <td>{inquiry.inquiryTitle}</td>
            <td>{inquiry.inquiryBody}</td>
            <td> {/* Placeholder for reply content */} </td>
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

export default InquiriesTable;