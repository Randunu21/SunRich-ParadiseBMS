import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const QualityManagerTable = () => {
  // Define state variables for selected inquiry and reply
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [reply, setReply] = useState('');

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
  const handleReply = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!selectedInquiry) {
      // Handle error: No inquiry selected
      console.error('Please select an inquiry to reply to.');
      return;
    }

    const { inquiryId } = selectedInquiry; // Extract inquiryId from selected inquiry

    try {
      const response = await axios.post('/reply', { inquiryId, reply });
      // Handle successful reply (optional)
      console.log('Reply submitted successfully:', response.data);
      setReply(''); // Clear the reply input after submission
    } catch (error) {
      console.error(error);
      // Handle error during reply submission (e.g., display error message to user)
    }
  };


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
              {selectedInquiry && selectedInquiry._id === inquiry._id ? (
                <form onSubmit={handleReply}>
                  <input type="text" name="reply" placeholder="Enter Reply" value={reply} onChange={(e) => setReply(e.target.value)} />
                  <button type="submit">Reply</button>
                </form>
              ) : (
                <p>No reply selected</p>
              )}
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