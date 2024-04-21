import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container mt-5">
      <h2>Order History</h2>
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
                style={{ width: "100px", height: "100px" }} // Adjust width and height as needed
              />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <h5 className="mb-1">Order ID: {order._id}</h5>
                  <div className="col-md-4 d-flex flex-column justify-content-between">
                    <button
                      className="btn btn-danger mb-2"
                      onClick={() => {
                        reOrder(order.cartID, order);
                      }}
                    >
                      Re-Order
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        viewDetails(order._id);
                      }}
                    >
                      View details
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
  );
};

export default CustomerOrderHistory;
