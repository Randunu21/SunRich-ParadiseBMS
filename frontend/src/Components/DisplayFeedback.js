import React, { useState, useEffect } from 'react';
import axios from "axios";
import AddFeedback from './AddFeedback'; // Import AddFeedback component

export default function DisplayFeedback({ productId }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/feedback`);
        setFeedback(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [productId]);

  // Automated response based on rating
  const getAutomatedResponse = (rating) => {
    const replies = {
      "very-disappointed": "Sorry to hear that you're very disappointed with our product. We'll do our best to improve your experience. Please contact us if you have any suggestions.",
      "disappointed": "We're sorry to hear you're disappointed. Let us know how we can improve your experience.",
      "neutral": "Thank you for your feedback.",
      "satisfied": "We're glad you're satisfied with our product!",
      "very-satisfied": "We're thrilled that you're very satisfied! Thank you for your feedback."
    };
    return replies[rating];
  };

  return (
    <div className="product-details">
      <div className="ratings-section mb-3 bg-success"> {/* Add custom class and Bootstrap bg-success */}
        <h2>Ratings & Reviews</h2>
        <hr className="ratings-line" />
        {/* AddFeedback component */}
        <AddFeedback />
        {feedback.length > 0 ? (
          <ul className="list-group list-group-flush">
            {feedback.map((feedbackItem) => (
              <li key={feedbackItem._id} className="list-group-item d-flex align-items-center border-bottom">
                <div className="media-body mr-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mt-0">{feedbackItem.rating}</h5>
                  </div>
                  <div>
                    <p className="text-muted mb-0 small">{feedbackItem.name}</p>
                    <p className="text-muted font-italic mb-0 small">Date: {new Date(feedbackItem.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-justify small">{feedbackItem.reviewTitle}</p>
                  <div className="alert alert-light small" role="alert">
                    <h4 className="alert-heading">Response</h4>
                    <p>{getAutomatedResponse(feedbackItem.rating)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};
