import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "../css/modal.css";

const AdminQuotationList = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [specCart, setSpecCart] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAnimated, setModalAnimated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/quotations/getAllQuotations")
      .then((res) => {
        setQuotations(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  //viewDetails
  const viewDetails = (quotationId) => {
    axios
      .get(`http://localhost:4000/api/quotations/getQuotation/${quotationId}`)
      .then((res) => {
        setSelectedQuotation(res.data);

        axios
          .get(`http://localhost:4000/api/cart/getCart/${res.data.cartID}`)
          .then((res) => {
            setSpecCart(res.data);
            showAnimatedModal();
          });
      });
  };

  //search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuotation = quotations.filter((quotation) => {
    return quotation._id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  //handle accept of a quotation
  const handleAnswer = () => {
    navigate("/admin-quotation-reply", { state: { selectedQuotation } });
    console.log(selectedQuotation);
  };

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

  //handle decline of a quotation

  const handleDecline = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, decline it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://localhost:4000/api/quotations/deleteQuotation/${id}`
            )
            .then((res) => {
              swal.fire(
                "Declined!",
                "The quotation has been declined.",
                "success"
              );
            })
            .catch((err) => {
              alert(err);
            });
        }
      });
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
      <div className="container">
        <h2>Quotations</h2>

        <hr />

        <div className="input-group rounded mb-3">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleSearch}
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="bi bi-search"></i>
          </span>
        </div>

        <table className="table table-striped rounded">
          <thead className="table-dark">
            <tr>
              <th>Quotation ID</th>
              <th>Cart ID</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotation &&
              filteredQuotation.map((quotation) => (
                <tr key={quotation.id}>
                  <td>{quotation._id || "N/A"}</td>
                  <td>
                    {quotation.cartID ? quotation.cartID._id || "N/A" : "N/A"}
                  </td>
                  <td>${quotation.postalCode}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => viewDetails(quotation._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {selectedQuotation && (
          <div
            className={`modal ${modalVisible ? "show" : ""} ${
              modalAnimated ? "animate" : ""
            }`}
            style={{ display: modalVisible ? "block" : "none" }}
            onClick={() => hideModal()}
          >
            {selectedQuotation && (
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="orderDetailsModal">
                      Quotation Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => hideModal()}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Order ID: {selectedQuotation._id || "N/A"}</p>
                    <p>First Name: {selectedQuotation.firstName}</p>
                    <p>Second Name: {selectedQuotation.secondName}</p>
                    <p>
                      Shipping Address 1: {selectedQuotation.shippingAddress1}
                    </p>
                    <p>
                      Shipping Address 2: {selectedQuotation.shippingAddress2}
                    </p>
                    <p>City: {selectedQuotation.city}</p>
                    <div>
                      Cart Items:
                      <table>
                        <tbody>
                          {specCart && specCart.cartItems ? (
                            specCart.cartItems.map((cartItem) => (
                              <tr key={cartItem._id}>
                                <td>{cartItem._id || "N/A"}</td>
                                <td>{cartItem.product}</td>
                                <td>{cartItem.quantity}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No cart items found</td>
                            </tr>
                          )}
                          {specCart && (
                            <tr>
                              <td colSpan="3">
                                Total Price: {specCart.totalPrice}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleAnswer()}
                      >
                        Answer
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleDecline(selectedQuotation._id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {modalVisible && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default AdminQuotationList;
