import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const CustomerOrderHistory = () => {
  const [orders, setOrders] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newCart, setNewCart] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/orders/past-orders/user/122")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []); //dependancy array is a must otherewise you will get unlimited reqs

  const viewDetails = (orderID) => {
    setModalVisible(true);
    console.log(orders);
  };

  const reOrder = (cartID, order) => {
    console.log(cartID);

    if (!cartID) {
      return;
    }

    axios
      .post("http://localhost:4000/api/cart/createCart", {
        userID: cartID.userID,
        cartItems: cartID.cartItems,
        totalPrice: cartID.totalPrice,
      })
      .then(async (res) => {
        //setNewCart(res.data);
        alert("cart Created");
        navigate("/delivery-details", {
          state: { orderDetails: order, cart: res.data },
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <style>
        {`
      body {
        background: #dbf8e3;
      }

      .container {
        background: #dcfce7;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .list-group-item {
        background: #ffffff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 20px;
      }

      .list-group-item img {
        width: 100px;
        height: 100px;
        border-radius: 8px;
        object-fit: cover;
        margin-right: 20px;
      }

      .btn {
        width: 120px;
        margin-right: 10px;
      }

      .btn-danger {
        background-color: #e3342f;
        color: white;
      }

      .btn-warning {
        background-color: #f7b924;
        color: white;
      }
    `}
      </style>

      <div className="container mt-5">
        <h2>Order History</h2>
        <hr />
        <div className="list-group mt-3">
          {orders &&
            orders.map((order) => (
              <div
                key={order._id}
                className="list-group-item d-flex align-items-center"
              >
                <img
                  src={order.photoURL}
                  alt="Order photo"
                  className="img-fluid mr-3"
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Order ID: {order._id}</h5>
                    <div className="col-md-4 d-flex justify-content-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => reOrder(order.cartID, order)}
                      >
                        Re-Order
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => viewDetails(order._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <p className="mb-1">
                    Items:{" "}
                    {order.cartID.cartItems
                      .map((item) => item.product)
                      .join(", ")}
                  </p>
                  <p className="mb-1">Total: ${order.totalPrice}</p>
                  <p className="mb-1">Status: {order.status}</p>
                  <p className="mb-1">
                    Date: {new Date(order.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderHistory;
