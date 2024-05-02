import React, { useState } from "react";
import axios from "axios";

export default function AddFeedback() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setShowFeedbackForm(!showFeedbackForm); // Toggle form visibility on click
  };

  const sendData = (e) => {
    e.preventDefault();
    const newFeedback = {
      name,
      email,
      rating,
      reviewTitle,
    };
    axios
      .post("http://localhost:4000/feedback/add", newFeedback)
      .then(() => {
        alert("Feedback added successfully.");
        setShowFeedbackForm(false); // Hide form after successful submission
        setName("");
        setEmail("");
        setRating("");
        setReviewTitle("");
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.error || "An error occurred.");
        } else if (err.request) {
          setErrorMessage("No response received from the server.");
        } else {
          setErrorMessage("Error sending request.");
        }
      });
  };

  return (
    <div className="container">
      <button onClick={handleClick}>Write a Feedback</button>
      {showFeedbackForm && ( // Conditionally render the form
        <div className="container">
          
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name here" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email here" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div>
                <input type="radio" id="very-disappointed" name="rating" value="very-disappointed" checked={rating === "very-disappointed"} onChange={(e) => setRating(e.target.value)} />
                <label htmlFor="very-disappointed">Very Disappointed</label>
              </div>
              <div>
                <input type="radio" id="disappointed" name="rating" value="disappointed" checked={rating === "disappointed"} onChange={(e) => setRating(e.target.value)} />
                <label htmlFor="disappointed">Disappointed</label>
              </div>
              <div>
                <input type="radio" id="neutral" name="rating" value="neutral" checked={rating === "neutral"} onChange={(e) => setRating(e.target.value)} />
                <label htmlFor="neutral">Neutral</label>
              </div>
              <div>
                <input type="radio" id="satisfied" name="rating" value="satisfied" checked={rating === "satisfied"} onChange={(e) => setRating(e.target.value)} />
                <label htmlFor="satisfied">Satisfied</label>
              </div>
              <div>
                <input type="radio" id="very-satisfied" name="rating" value="very-satisfied" checked={rating === "very-satisfied"} onChange={(e) => setRating(e.target.value)} />
                <label htmlFor="very-satisfied">Very Satisfied</label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">Review</label>
              <textarea className="form-control" id="review" rows="3" placeholder="Enter your review here" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}></textarea>
            </div>
            <div className="text-danger">{errorMessage}</div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
