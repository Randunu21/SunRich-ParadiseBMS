import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

const CustomerOrderTracking = () => {
  const [orders, setOrders] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/orders/current-orders/user/122")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const getColor = (status) => {
    let priority = 0;

    switch (status) {
      case "pending":
        priority = 1;
        break;
      case "on going":
        priority = 2;
        break;
      case "dispatched":
        priority = 3;
        break;
      case "completed":
        priority = 4;
        break;
      default:
        priority = 0;
    }

    return priority;
  };

  return (
    <div>
      <style>
        {`
      body {
        background: #dbf8e3;
      }
    `}
      </style>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              {orders &&
                orders.map((order) => (
                  <div
                    className="card border-top border-bottom border-3"
                    style={{ borderColor: "#f37a27 !important" }}
                  >
                    <div className="card-body p-5">
                      <p
                        className="lead fw-bold mb-5"
                        style={{ color: "#f37a27" }}
                      >
                        Purchase Receipt
                      </p>

                      <div className="row">
                        <div className="col mb-3">
                          <p className="small text-muted mb-1">Date</p>
                          <p>{order.dateOfOrder}</p>
                        </div>
                        <div className="col mb-3">
                          <p className="small text-muted mb-1">Order No.</p>
                          <p>{order._id}</p>
                        </div>
                      </div>

                      <div
                        className="mx-n5 px-5 py-4"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        <div className="row">
                          <div className="col-md-8 col-lg-9">
                            {order.cartID.cartItems.map((cartItem) => (
                              <p>{cartItem.product}</p>
                            ))}
                          </div>
                          <div className="col-md-4 col-lg-3">
                            <p>${order.totalPrice}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 col-lg-9">
                            <p className="mb-0">Shipping</p>
                          </div>
                          <div className="col-md-4 col-lg-3">
                            <p className="mb-0">£33.00</p>
                          </div>
                        </div>
                      </div>

                      <div className="row my-4">
                        <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                          <p
                            className="lead fw-bold mb-0"
                            style={{ color: "#f37a27" }}
                          >
                            £262.99
                          </p>
                        </div>
                      </div>

                      <p
                        className="lead fw-bold mb-4 pb-2"
                        style={{ color: "#f37a27" }}
                      >
                        Tracking Order
                      </p>

                      <div className="progress mb-4">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width: `${(getColor(order.status) * 100) / 7}%`,
                          }} // You can adjust the width based on progress
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          id="orderProgressBar" // Added an id for easy access
                        ></div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="horizontal-timeline">
                            <ul className="list-inline items d-flex justify-content-between">
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{
                                    backgroundColor:
                                      getColor(order.status) >= 1
                                        ? "#f37a27"
                                        : "#6c757d",
                                  }}
                                >
                                  Pending
                                </p>
                              </li>
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{
                                    backgroundColor:
                                      getColor(order.status) >= 2
                                        ? "#f37a27"
                                        : "#6c757d",
                                  }}
                                >
                                  On progress
                                </p>
                              </li>
                              <li className="list-inline-item items-list">
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{
                                    backgroundColor:
                                      getColor(order.status) >= 3
                                        ? "#f37a27"
                                        : "#6c757d",
                                  }}
                                >
                                  Dispatched
                                </p>
                              </li>
                              <li
                                className="list-inline-item items-list text-end"
                                style={{ marginRight: "8px" }}
                              >
                                <p
                                  className="py-1 px-2 rounded text-white"
                                  style={{
                                    marginRight: "-8px",
                                    backgroundColor: "#6c757d",
                                  }}
                                >
                                  Delivered
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 pt-2 mb-0">
                        Want any help?{" "}
                        <Link to="/contact" style={{ color: "#f37a27" }}>
                          Please contact us
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerOrderTracking;
