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

    alert("are you sure"); //alert

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
        alert("quotation replied");
      })
      .catch((err) => {
        alert(err);
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
    <div className="container mt-5">
      <h1>Quotation Reply</h1>
      <hr />

      <div className="mb-3">
        <h5>Quotation Items</h5>
        <ul className="list-group">
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
                  onChange={(e) => handleItemPriceChange(index, e.target.value)}
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
  );
};

export default AdminQuotationReply;
