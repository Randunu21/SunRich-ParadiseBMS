import { useState, useEffect } from "react";
import axios from "axios";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getPastOrders = () => {
      axios
        .get("http://localhost:4000/api/orders/past-orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };

    getPastOrders();
  }, []);

  return (
    <div className="container">
      <h2>past Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Cart ID</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.cartID}</td>
                <td>${order.postalCode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastOrders;
