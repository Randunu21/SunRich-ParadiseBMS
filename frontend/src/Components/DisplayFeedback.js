import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFeedback from './AddFeedback';

export default function ProductDetails({ productId, loggedInUserId }) {
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();

  const getTimeDifferenceString = (date1, date2) => {
    const differenceInMs = Math.abs(date2 - date1); // milliseconds difference
  
    const secondInMs = 1000;
    const minuteInMs = secondInMs * 60;
    const hourInMs = minuteInMs * 60;
    const dayInMs = hourInMs * 24;
  
    const days = Math.floor(differenceInMs / dayInMs);
    const hours = Math.floor((differenceInMs % dayInMs) / hourInMs);
    const minutes = Math.floor((differenceInMs % hourInMs) / minuteInMs);
    const seconds = Math.floor((differenceInMs % minuteInMs) / secondInMs);
  
    let timeDifferenceString;
    if (days > 0) {
      timeDifferenceString = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      timeDifferenceString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      timeDifferenceString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      timeDifferenceString = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  
    return timeDifferenceString;
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/feedback?productId=${productId}`);
        setFeedback(response.data.map(feedbackItem => {
          const replies = {
            "very-disappointed": "Sorry to hear that you're very disappointed with our product. We'll do our best to improve your experience. Please contact us if you have any suggestions.",
            "disappointed": "We're sorry to hear you're disappointed. Let us know how we can improve your experience.",
            "neutral": "Thank you for your feedback.",
            "satisfied": "We're glad you're satisfied with our product!",
            "very-satisfied": "We're thrilled that you're very satisfied! Thank you for your feedback."
          };
          feedbackItem.reply = replies[feedbackItem.rating];
          return feedbackItem;
        }));
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [productId]);

  const handleDelete = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`http://localhost:4000/feedback/delete/${feedbackId}`);
        setFeedback(feedback.filter(item => item._id !== feedbackId));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };
  const handleAddFeedback = async (feedbackData) => {
    try {
      const response = await axios.post(`http://localhost:4000/feedback`, feedbackData);
      setFeedback([...feedback, response.data]); // Add new feedback to state
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <div className="product-details">
      {/* ... other product details */}
      <div className="ratings-section mb-3">
        <h2>Ratings & Reviews</h2>
        <hr className="ratings-line" />

        {feedback.length > 0 ? (
          <ul className="list-group list-group-flush">
            {feedback.map((feedbackItem) => (
              <li key={feedbackItem._id} className="list-group-item d-flex align-items-center border-bottom">
                <div className="media-body mr-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mt-0">{feedbackItem.rating}</h5>
                    
                  </div>
                  <div>
                    <p className="text-muted mb-0">{feedbackItem.name}</p>
                    <p className="text-muted font-italic mb-0">{getTimeDifferenceString(new Date(feedbackItem.createdAt), new Date())}</p>
                  </div>
                  <p className="text-justify">{feedbackItem.reviewTitle}</p>
                  {loggedInUserId === feedbackItem.userId && (
                      <button className="btn btn-sm btn-success" onClick={() => handleDelete(feedbackItem._id)}>Delete</button>
                    )}
                  <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">Response</h4>
                    <p>{feedbackItem.reply}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )} <AddFeedback productId={productId} onAddFeedback={handleAddFeedback} />
      </div>
    </div>
  );
}