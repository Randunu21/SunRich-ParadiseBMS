import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import swal from "sweetalert2";

const CustomerQuotations = () => {
  const [quotations, setQuotations] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/quotations/user/getQuotations/122")
      .then((res) => {
        setQuotations(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Get the entire document body
    const body = document.body;

    // Create a canvas with dimensions covering the entire page
    html2canvas(body, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", [canvas.width, canvas.height]); // Create PDF with custom dimensions
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("quotation.pdf");
    });
  };

  const handleOrder = () => {
    alert("you want to order?"); //alert
    axios.post("");
  };

  return (
    <div>
      <style>
        {`
      body {
        background: #dbf8e3;
      }

      .no-items-text {
        color: #888; /* Text color */
        font-size: 20px; /* Font size */
        text-align: center; /* Center alignment */
        padding: 20px; /* Add padding for better spacing */
        background-color: #f8f9fa; /* Background color */
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow for depth */
        max-width: 400px; /* Limit the width for better readability */
        margin: 0 auto; /* Center horizontally */
      }
      
      /* Optionally, you can add some animation for a more dynamic appearance */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      .no-items-text {
        animation: fadeIn 0.5s ease; /* Apply fade-in animation */
      }
      
    `}
      </style>
      <div className="card" id="quotation">
        {quotations ? (
          <div className="card-body">
            <div className="container mb-5 mt-3">
              <div className="row d-flex align-items-baseline">
                <div className="col-xl-9">
                  <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                    Invoice <strong>{quotations.id}</strong>
                  </p>
                </div>
                <div className="col-xl-3 float-end">
                  <button
                    className="btn btn-light text-capitalize border-0"
                    onClick={handlePrint}
                  >
                    <i className="fas fa-print text-primary"></i> Print
                  </button>
                  <button
                    className="btn btn-light text-capitalize"
                    onClick={handleExport}
                  >
                    <i className="far fa-file-pdf text-danger"></i> Export
                  </button>
                </div>
                <hr />
              </div>

              <div className="container">
                <div className="col-md-12">
                  <div className="text-center">
                    <i
                      className="fab fa-mdb fa-4x ms-0"
                      style={{ color: "#5d9fc5" }}
                    ></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8">
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        To:{" "}
                        <span style={{ color: "#5d9fc5" }}>
                          {quotations.firstName}
                        </span>
                      </li>
                      <li className="text-muted">
                        {quotations.shippingAddress1} ,{" "}
                        {quotations.shippingAddress2}
                      </li>
                      <li className="text-muted">
                        {quotations.city}, {quotations.country}
                      </li>
                      <li className="text-muted">
                        <i className="fas fa-phone"></i>{" "}
                        {quotations.phoneNumber}
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-4">
                    <p className="text-muted">Invoice</p>
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="fw-bold">ID:</span>#{quotations.id}
                      </li>
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="fw-bold">Creation Date: </span>
                        {quotations.dateOfOrder}
                      </li>
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="me-1 fw-bold">Status:</span>
                        <span className="badge bg-warning text-black fw-bold">
                          {quotations.status}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row my-2 mx-1 justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead
                      style={{ backgroundColor: "#84B0CA" }}
                      className="text-white"
                    >
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotations.cartID.cartItems &&
                        quotations.cartID.cartItems.map((item, index) => (
                          <tr key={item.id}>
                            <th scope="row">{index}</th>
                            <td>{item.product}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-xl-8">
                    <p className="ms-3">
                      Add additional notes and payment information
                    </p>
                  </div>
                  <div className="col-xl-3">
                    <ul className="list-unstyled">
                      <li className="text-muted ms-3">
                        <span className="text-black me-4">SubTotal</span>
                        {quotations.cartID.totalPrice}
                      </li>
                      <li className="text-muted ms-3 mt-2">
                        <span className="text-black me-4">Shipping cost</span>$
                        {quotations.shippingCost}
                      </li>
                    </ul>
                    <p className="text-black float-start">
                      <span className="text-black me-3"> Total Amount</span>
                      <span style={{ fontSize: "25px" }}>
                        ${quotations.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-10">
                    <p>Thank you for your purchase</p>
                  </div>
                  <div className="col-xl-2">
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize"
                      style={{ backgroundColor: "#60bdf3" }}
                      onClick={() => handleOrder()}
                    >
                      Make Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="row justify-content-center align-items-center no-items-text"
            style={{ minHeight: "50vh" }}
          >
            <p className="text-muted fs-5">No items to show</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerQuotations;
