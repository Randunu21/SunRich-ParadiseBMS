import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [specCart, setSpecCart] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAnimated, setModalAnimated] = useState(false);

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
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to accept this order?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, accept it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Handle accept logic here
          axios
            .patch(
              `http://localhost:4000/api/orders/updateOrder/${selectedOrder._id}`,
              { status: "" }
            )
            .then(() => {
              swal.fire("Accepted!", "The order has been accepted.", "success");
            })
            .catch((err) => {
              swal.fire("Error", "Failed to accept order", "error");
            });
        }
      });
  };

  const viewDetails = (orderId) => {
    axios
      .get(`http://localhost:4000/api/orders/all-orders/${orderId}`)
      .then((res) => {
        setSelectedOrder(res.data);

        axios
          .get(`http://localhost:4000/api/cart/getCart/${res.data.cartID}`)
          .then((res) => {
            setSpecCart(res.data);
            showAnimatedModal();
          });
      });
  };

  const handleDecline = () => {
    swal
      .fire({
        title: "Are you sure?",
        text: "Are You Sure You Want To Decline This Order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Handle delete logic here
          axios
            .delete(
              `http://localhost:4000/api/orders/deleteOrder/${selectedOrder.id}`
            )
            .then(() => {
              swal.fire("Accepted!", "The order has been deleted.", "success");
            })
            .catch((err) => {
              swal.fire("Error", "Failed to delete order", "error");
            });
        }
      });
  }; ////alert

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrder = orders.filter((order) => {
    return order._id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const showAnimatedModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalAnimated(true);
    }, 100);
  };

  const hideModal = () => {
    setModalAnimated(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  return (
    <div>
      <style type="text/css">
        {`
        body {
          background: #dbf8e3;
        }

        .container {
          margin-top: 30px;
        }

        .search-section input[type="search"] {
          border-radius: 20px 0 0 20px;
          padding: .5rem .75rem;
        }

        .search-section .input-group-text {
          background: white;
          border-radius: 0 20px 20px 0;
          border: none;
        }

        .table-container {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 6px 12px rgba(0,0,0,.1);
          overflow: hidden;
        }

        .table {
          margin-bottom: 0;
        }

        .table thead {
          background: #065535;
          color: white;
        }

        .table td, .table th {
          vertical-align: middle;
        }

        .btn-view-details {
          color: #fff;
          background-color: #f0ad4e;
          border-color: #f0ad4e;
        }

        .btn-view-details:hover {
          background-color: #ec971f;
          border-color: #d58512;
        }

        .modal-dialog {
          margin-top: 10vh;
        }

        .modal-content {
          border-radius: 15px;
          overflow: hidden;
        }

        .modal-header {
          background: #065535;
          color: white;
        }

        .modal-body {
          padding: 2rem;
        }

        .modal-footer {
          border-top: none;
          padding: 1rem 2rem;
        }

        .btn-accept, .btn-decline {
          width: 100px;
          margin-right: 10px;
        }

        .modal-backdrop.show {
          opacity: 0.5;
        }
      `}
      </style>

      <div className="container">
        <h2 className="mb-3">Pending Orders</h2>
        <hr />

        <div className="input-group search-section rounded mb-3">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleSearch}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="bi bi-search"></i>
          </span>
        </div>

        <div className="table-container">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Cart ID</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrder &&
                filteredOrder.map((order) => (
                  <tr key={order.id}>
                    <td>{order._id || "N/A"}</td>
                    <td>{order.cartID || "N/A"}</td>
                    <td>${order.postalCode || "N/A"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-warning btn-view-details"
                        onClick={() => viewDetails(order._id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalVisible && (
          <div
            className={`modal ${modalVisible ? "show" : ""} ${
              modalAnimated ? "animate" : ""
            }`}
            style={{ display: modalVisible ? "block" : "none" }}
            onClick={() => hideModal()}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="orderDetailsModal">
                    Order Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {" "}
                  <p>Order ID:{selectedOrder._id}</p>
                  <p>First Name:{selectedOrder.firstName}</p>
                  <p>Second Name : {selectedOrder.secondName}</p>
                  <p>shippingAddress1:{selectedOrder.shippingAddress1}</p>
                  <p>shippingAddress2:{selectedOrder.shippingAddress2}</p>
                  <p>city:{selectedOrder.city}</p>
                  <div>
                    Cart Items:
                    <table>
                      <tbody>
                        {specCart.cartItems &&
                          specCart.cartItems.map((cartItem) => (
                            <tr key={cartItem._id}>
                              <td>{cartItem._id}</td>
                              <td>{cartItem.product}</td>
                              <td>{cartItem.quantity}</td>
                            </tr>
                          ))}
                        <tr>
                          <td colSpan="3">
                            Total Price: {specCart.totalPrice}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success btn-accept"
                    onClick={() => handleAccept()}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-decline"
                    onClick={() => handleDecline()}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal backdrop */}
        {modalVisible && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default PendingOrder;
