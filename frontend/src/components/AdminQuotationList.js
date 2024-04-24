import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const AdminQuotationList = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [specCart, setSpecCart] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
            setModalVisible(true);
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

  //handle decline of a quotation

  const handleDecline = (id) => {
    axios
      .delete(`http://localhost:4000/api/quotations/deleteQuotation/${id}`)
      .then((res) => {
        alert("are you sure"); //alert
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <h2>Quotations</h2>

      <div className="d-flex justify-content-center mt-3 input-group mb-3">
        <input
          type="text"
          placeholder="Search by quotation ID or Cart ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped">
        <thead>
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
          className={`modal fade ${modalVisible ? "show" : ""}`}
          style={{ display: modalVisible ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="orderDetailsModal"
          aria-hidden={!modalVisible}
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
                    onClick={() => setModalVisible(false)}
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
  );
};

export default AdminQuotationList;
