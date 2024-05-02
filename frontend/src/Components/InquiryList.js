import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InquiriesTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inquiriesResponse = await axios.get("http://localhost:4000/Inquiry/user-inquiry-details");
        setInquiries(inquiriesResponse.data);

        const repliesResponse = await axios.get("http://localhost:4000/Reply/");
        setReplies(repliesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const findReplyByInquiryId = (inquiryId) => {
    return replies.find((reply) => reply.inquiryid === inquiryId);
  };

  const handleEdit = async (id) => {
    // Fetch the inquiry by ID
    const inquiryToEdit = inquiries.find((inquiry) => inquiry._id === id);

    // Prompt the user to enter updated details
    const newName = prompt('Enter new name:', inquiryToEdit.name);
    const newEmail = prompt('Enter new email:', inquiryToEdit.email);
    const newTitle = prompt('Enter new title:', inquiryToEdit.inquiryTitle);
    const newBody = prompt('Enter new body:', inquiryToEdit.inquiryBody);

    // Send PUT request to update inquiry details
    try {
      await axios.put(`http://localhost:4000/Inquiry/update/${id}`, {
        name: newName,
        email: newEmail,
        inquiryTitle: newTitle,
        inquiryBody: newBody
      });

      // Update the inquiries state to reflect the changes
      setInquiries(inquiries.map((inquiry) => {
        if (inquiry._id === id) {
          return {
            ...inquiry,
            inquiryTitle: newTitle,
            inquiryBody: newBody
          };
        }
        return inquiry;
      }));
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Inquiry/delete/${id}`);
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

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
        {inquiries.map((inquiry) => {
          const reply = findReplyByInquiryId(inquiry._id);
          return (
            <tr key={inquiry._id}>
              <td>{inquiry.inquiryTitle}</td>
              <td>{inquiry.inquiryBody}</td>
              <td>{reply ? reply.reply : 'pending'}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(inquiry._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(inquiry._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InquiriesTable;
