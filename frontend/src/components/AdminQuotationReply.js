import React, { useState } from "react";
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
        background: #effaf3;
      }
  
      .container {
        background: linear-gradient(to bottom, #dcfce7 0%, #bef8d8 100%);
        border-radius: 12px;
        padding: 25px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.12);
        transition: all 0.3s ease;
      }
  
      .container:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.18);
      }
  
      h1 {
        color: #2c3e50;
        margin-bottom: 20px;
        font-family: 'Helvetica Neue', sans-serif;
      }
  
      .mb-3 {
        margin-bottom: 20px;
      }
  
      .list-group-item {
        border: none;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        padding: 20px;
        background-color: #ffffff;
        margin-bottom: 15px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
  
      .list-group-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }
  
      label {
        font-weight: bold;
        color: #34495e;
      }
  
      input[type="text"], .form-control {
        border: 2px solid #bdc3c7;
        padding: 10px;
        border-radius: 8px;
        transition: border 0.2s ease-in-out;
      }
  
      input[type="text"]:focus, .form-control:focus {
        border-color: #3498db;
        box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
      }
  
      button {
        width: 250px;
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        transition: background-color 0.2s ease-in-out;
      }
  
      button:hover {
        background-color: #27ae60;
        cursor: pointer;
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
