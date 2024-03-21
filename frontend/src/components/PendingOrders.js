import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getStudents = () => {
      axios
        .get("http://localhost:4000/api/orders/pending-orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getStudents();
  }, []);

  const handleAccept = () => {
    axios.patch("http://localhost:4000/api/orders/").then(() => {
      alert("Order Accepted");
    });
  };

  const handleDecline = () => {};

  return (
    <div className="container">
      <h2>Pending Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Cart ID</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.cartID}</td>
                <td>${order.postalCode}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleAccept(order.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDecline(order.id)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrder;
