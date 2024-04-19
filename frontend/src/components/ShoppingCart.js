import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const loadCart = () => {
      axios
        .get("http://localhost:4000/api/cart/userCart/:userID")
        .then((res) => {
          setShoppingCart(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });

  const addToCart = () => {
    const newItem = {
      cartItems: {
        product,
        quantity,
      },
    };

    if (shoppingCart === null) {
      axios
        .post("http://localhost:4000/api/cart/createCart", newItem)
        .then((res) => {
          setShoppingCart(res.data);
        });
    } else {
      axios
        .patch("http://localhost:4000/api/cart/updateCart/:id", newItem)
        .then((res) => {
          setShoppingCart(res.data);
          alert("Item added");
        });
    }
  };

  const removeFromCart = (item) => {
    axios.patch("http://localhost:4000/api/cart/updateCart/:cartID").then();
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>Items in Cart</h2>
          <ul className="list-group">
            {shoppingCart.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.product}
                <div class="col-md-4">
                  <label for="inputQuantity" class="form-label">
                    quantity
                  </label>
                  <select
                    id="inputQuantity"
                    class="form-select"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  >
                    <option selected>Choose...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <span className="badge bg-primary rounded-pill">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total</h3>
              <p className="card-text">Total Price: </p>
              <a href="/delivery-details">
                <button className="btn btn-success">Checkout</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
