import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QualityManagerTable = () => {
  const [inquiries, setInquiries] = useState([]);
  const [replies, setReplies] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquiriesResponse = await axios.get("http://localhost:4000/Inquiry/all-inquiries");
        setInquiries(inquiriesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReplies = async () => {
      try {
        const repliesResponse = await axios.get("http://localhost:4000/Reply/");
        const replyData = repliesResponse.data.reduce((acc, reply) => {
          acc[reply.inquiryid] = reply;
          return acc;
        }, {});
        setReplies(replyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiries();
    fetchReplies();
  }, []);

  const handleReply = async (event, inquiryId) => {
    event.preventDefault();

    const replyInput = event.target.elements.reply;
    const replyText = replyInput.value;

    if (!replyText) {
      console.error('Please enter a reply before submitting.');
      return;
    }

    try {
      const existingReply = replies[inquiryId];
      if (existingReply) {
        console.error('Reply already exists for this inquiry. Use edit to modify.');
        return;
      }

      const response = await axios.post("http://localhost:4000/Reply/add", { inquiryId, reply: replyText });
      console.log('Reply submitted successfully:', response.data);
      setReplies({ ...replies, [inquiryId]: response.data });
      replyInput.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReply = async (event, inquiryId) => {
    event.preventDefault();

    const replyInput = event.target.elements.reply;
    const updatedReplyText = replyInput.value;

    if (!updatedReplyText) {
      console.error('Please enter a reply before updating.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/Reply/${replies[inquiryId]._id}`, { reply: updatedReplyText });
      console.log('Reply updated successfully:', response.data);
      setReplies({ ...replies, [inquiryId]: response.data });
      setIsEditing({ ...isEditing, [inquiryId]: false });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (inquiryId) => {
    try {
      await axios.delete(`http://localhost:4000/Reply/${replies[inquiryId]._id}`);
      const updatedReplies = { ...replies };
      delete updatedReplies[inquiryId];
      setReplies(updatedReplies);
    } catch (error) {
      console.error(error);
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
        {inquiries.map((inquiry) => {
          const submittedReply = replies[inquiry._id];

          return (
            <tr key={inquiry._id}>
              <td>{inquiry.name}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.inquiryTitle}</td>
              <td>{inquiry.inquiryBody}</td>
              <td>
                {submittedReply ? (
                  <div>
                    <div>{submittedReply.reply}</div>
                    {isEditing[inquiry._id] ? (
                      <form onSubmit={(e) => handleEditReply(e, inquiry._id)}>
                        <input type="text" name="reply" defaultValue={submittedReply.reply} />
                        <button type="submit">Update Reply</button>
                      </form>
                    ) : null}
                  </div>
                ) : (
                  <form onSubmit={(e) => handleReply(e, inquiry._id)}>
                    <input type="text" name="reply" placeholder="Enter Reply" />
                    <button type="submit">Reply</button>
                  </form>
                )}
              </td>
              <td>
                {submittedReply && (
                  <>
                    <button className="btn btn-danger" onClick={() => handleDeleteReply(inquiry._id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => setIsEditing({ ...isEditing, [inquiry._id]: true })}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default QualityManagerTable;
