import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [specCart, setSpecCart] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    axios
      .patch("http://localhost:4000/api/orders/order-status/:id")
      .then(() => {
        alert("Order Accepted"); //alert
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
            setModalVisible(true);
          });
      });
  };

  const handleDecline = () => {}; ////alert

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrder = orders.filter((order) => {
    return order._id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h2>Pending Orders</h2>

      <div className="d-flex justify-content-center mt-3 input-group mb-3">
        <input
          type="text"
          placeholder="Search by Order ID or Cart ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped">
        <thead>
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
                <td>{order._id}</td>
                <td>{order.cartID}</td>
                <td>${order.postalCode}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => viewDetails(order._id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div
          className={`modal fade ${modalVisible ? "show" : ""}`}
          style={{ display: modalVisible ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="orderDetailsModal"
          aria-hidden={!modalVisible}
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
                        <td colSpan="3">Total Price: {specCart.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" class="btn btn-success">
                    Accept
                  </button>
                  <button type="button" class="btn btn-danger">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalVisible && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default PendingOrder;
