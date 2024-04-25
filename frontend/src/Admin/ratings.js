import React, { useState, useEffect } from "react";

export default function Ratings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Fetch ratings data from your backend API when the component mounts
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/products/ratings"
      ); // Assuming your backend API endpoint is '/api/product/ratings'
      const data = await response.json();
      if (data.success) {
        setRatings(data.data);
      } else {
        console.error("Failed to fetch ratings:", data.error);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  return (
    <div class="container mt-5 mb-5">
      <h2 className="text-center">All Ratings</h2>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Rating Value</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((rating) => (
              <tr key={rating._id}>
                <td>{rating.productId}</td>
                <td>{rating.ratingValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
