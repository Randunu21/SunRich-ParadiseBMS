import React, { useState } from "react";
import axios from "axios"

export default function AddFeedback() {
    // Define State for Feedback Form Visibility
    const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false);

    // Toggle Feedback Form Visibility
    const toggleFeedbackFormVisibility = () => {
        setIsFeedbackFormVisible(!isFeedbackFormVisible);
    };
    // Define State for Selected Images (Array)
  const [selectedImages, setSelectedImages] = useState([]);

  // Function to handle image selection (multiple)
  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setSelectedImages(newImages);
  };


   // Define State for Form Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("rating", rating);
    formData.append("reviewTitle", reviewTitle);

  // Append all selected images to FormData
  selectedImages.forEach((image) => formData.append("image", image));

axios.post("http://localhost:4000/feedback/add", formData).then(() => {
    alert("Feedback added");
}).catch((err) => {
    alert(err);
});
  }

    return (
        <div className="container">
            <p onClick={toggleFeedbackFormVisibility} style={{ cursor: "pointer" }}>Add a Review</p>

            {/* Conditional Rendering for Feedback Form */}
            {isFeedbackFormVisible && (
                <div className="container">
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Images (optional)</label>
                            <input type="file" className="form-control" id="image" multiple onChange={handleImageChange} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}