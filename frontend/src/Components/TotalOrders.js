import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

function OrderStatistics() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalQuotations, setTotalQuotations] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const ordersResponse = await axios.get(
          "http://localhost:4000/api/orders/total-orders"
        );
        const quotationsResponse = await axios.get(
          "http://localhost:4000/api/quotations/total-quotations"
        );

        setTotalOrders(ordersResponse.data.totalOrders);
        setTotalQuotations(quotationsResponse.data.totalQuotation);

        console.log(quotationsResponse.data.totalQuotation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const data = {
    labels: ["Orders", "Quotations"],
    datasets: [
      {
        data: [totalOrders, totalQuotations],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="container">
      <h2>Total Orders and Quotations</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pie
          data={{
            labels: ["Orders", "Quotations"],
            datasets: [
              {
                data: [totalOrders, totalQuotations],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
              },
            ],
          }}
        />
      </div>
      <div className="row mt-5">
        <div className="col">
          <h3>Orders</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Total Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalOrders}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <h3>Quotations</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Total Quotations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalQuotations}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderStatistics;
