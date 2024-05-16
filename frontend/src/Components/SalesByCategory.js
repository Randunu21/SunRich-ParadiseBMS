import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SalesByCategory.css";

function SalesByCategory() {
  const [salesByCategory, setSalesByCategory] = useState([]);

  useEffect(() => {
    async function fetchSalesByCategory() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/cart/sales-by-category"
        );
        setSalesByCategory(response.data.salesByCategory);
      } catch (error) {
        console.error("Error fetching sales by category:", error);
      }
    }

    fetchSalesByCategory();
  }, []);

  // Extracting labels and data for Chart.js
  const categoryLabels = salesByCategory.map((category) => category._id);
  const salesData = salesByCategory.map((category) => category.totalSales);

  const data = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Total Sales",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: salesData,
      },
    ],
  };

  return (
    <div className="container sales-container">
      <h2>Sales By Category</h2>
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesByCategory.map((category, index) => (
              <tr key={index}>
                <td>{category._id}</td>
                <td>{category.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default SalesByCategory;
