import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";

const AdminQuotationReply = () => {
  const location = useLocation();

  const { selectedQuotation = {} } = location.state || {
    selectedQuotation: {},
  };

  const [quotation, setQuotation] = useState(selectedQuotation);
  const [cost, setCost] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const calculateTotal = () => {
    let totalPrice = 0;

    quotation.cartID.cartItems.forEach((item) => {
      if (item.price && !isNaN(parseFloat(item.price))) {
        totalPrice += parseFloat(item.price);
      }
    });

    if (!isNaN(parseFloat(shippingCost))) {
      totalPrice += parseFloat(shippingCost);
    }

    return totalPrice;
  };

  const handleReply = (id) => {
    const updatedCartItems = quotation.cartID.cartItems.map((item) => ({
      product: item.product,
      price: item.price,
    }));

    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to reply to this quotation?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reply!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(
              `http://localhost:4000/api/quotations/updateQuotation/${selectedQuotation._id}`,
              {
                reply: "Completed",
                cartID: {
                  cartItems: updatedCartItems,
                },
                totalPrice: calculateTotal(),
              }
            )
            .then((res) => {
              swal.fire(
                "Replied!",
                "The quotation has been replied.",
                "success"
              );
            })
            .catch((err) => {
              swal.fire("Error!", "Failed to reply to the quotation.", "error");
            });
        }
      });
  };

  const handleItemPriceChange = (index, value) => {
    const updatedItems = [...quotation.cartID.cartItems];
    updatedItems[index].price = value;
    setQuotation({
      ...quotation,
      cartID: {
        ...quotation.cartID,
        cartItems: updatedItems,
      },
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
  
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
  
        .mb-3 {
          margin-bottom: 20px;
        }
  
        .list-group-item {
          border: none;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 15px;
          background-color: #ffffff;
          margin-bottom: 10px;
        }
  
        .list-group-item div {
          margin-bottom: 5px;
        }
  
        .list-group-item input[type="text"] {
          width: 100px;
        }
  
        label {
          font-weight: bold;
        }
  
        button {
          width: 200px;
        }
  
        .btn-primary {
          background-color: #007bff;
          color: #ffffff;
        }
  
        .btn-primary:hover {
          background-color: #0056b3;
        }

        .list-group-item input[type="text"] {
          width: 100px;
          border: 1px solid #ced4da; /* Add border */
          padding: 8px; /* Add padding */
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; 
        }
    
        .list-group-item input[type="text"]:focus {
          border-color: #80bdff; /* Change border color on focus */
          outline: 0; /* Remove default focus outline */
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Add box shadow on focus */
        }
      `}
      </style>

      <div className="container mt-5">
        <h1>Quotation Reply</h1>
        <hr />

        <div className="mb-3">
          <h5>Quotation Items</h5>
          <ul className="list-group list-group-flush striped">
            {quotation.cartID.cartItems.map((item, index) => (
              <li key={index} className="list-group-item">
                <div>{item.product}</div>
                <div>Requested Quantity: {item.quantity}</div>
                <div>
                  <label htmlFor={`price-${index}`}>Price:</label>
                  <input
                    type="text"
                    id={`price-${index}`}
                    value={item.price}
                    onChange={(e) =>
                      handleItemPriceChange(index, e.target.value)
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost:
          </label>
          <input
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shippingCost" className="form-label">
            Shipping Cost:
          </label>
          <input
            type="text"
            className="form-control"
            id="shippingCost"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
          />
        </div>

        <div>
          <label>Total Price</label>
          <p>{calculateTotal()}</p>
        </div>

        <button className="btn btn-primary" onClick={() => handleReply()}>
          Reply to Quotation
        </button>
      </div>
    </div>
  );
};

export default AdminQuotationReply;
