import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Ratings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // Fetch ratings data from your backend API when the component mounts
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/products/ratings")
        .then((res) => {
          console.log(res.data);
          if (res) {
            setRatings(res.data);
          } else {
            console.error("Failed to fetch ratings:");
          }
        }); // Assuming your backend API endpoint is '/api/product/ratings'
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
