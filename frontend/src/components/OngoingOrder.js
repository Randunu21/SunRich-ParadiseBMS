import { useState, useEffect } from "react";
import axios from "axios";

const OngoingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOnGoingOrders = () => {
      axios
        .get("http://localhost:4000/api/orders/ongoing-orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    getOnGoingOrders();
  }, []);

  const handleEdit = () => {};

  return (
    <div className="container">
      <h2>Ongoing Orders</h2>
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
                    className="btn btn-danger"
                    onClick={() => handleEdit(order.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingOrders;
