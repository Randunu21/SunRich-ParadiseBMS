import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

function TopSellingProducts() {
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    async function fetchTopSellingProducts() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/cart/top-selling"
        );
        setTopSellingProducts(response.data.topSellingProducts);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    }

    fetchTopSellingProducts();
  }, []);

  // Extracting labels and data for Chart.js
  const productLabels = topSellingProducts.map(
    (product) =>
      (product.productDetails.length > 0 && product.productDetails[0].name) ||
      "Product Name Not Available"
  );
  const salesData = topSellingProducts.map((product) => product.totalSales);

  const data = {
    labels: productLabels,
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
    <div>
      <style>
        {`
                .chart-container {
                    margin-top: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 15px;
                  }
                  
           `}
      </style>
      <div className="container">
        <h2>Top Selling Products</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts.map((product, index) => (
              <tr key={index}>
                <td>
                  {(product.productDetails.length > 0 &&
                    product.productDetails[0].name) ||
                    "Product Name Not Available"}
                </td>
                <td>{product.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chart-container">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}

export default TopSellingProducts;
