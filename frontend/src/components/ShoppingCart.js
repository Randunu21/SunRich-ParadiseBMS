import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import axios from "axios";
import "../css/shoppingCart.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState({ cartItems: [] });
  const [numOfMainProducts, setNumOfMainProducts] = useState(0);

  const userID = localStorage.getItem("userId");
  //const [product, setProduct] = useState("");
  //const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      await axios
        .get(`http://localhost:4000/api/cart/userCart/${userID}`)
        .then((res) => {
          console.log(res.data);
          setShoppingCart(res.data);
          itemQuantity();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadCart();
  }, []);

  /*const addToCart = () => {
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
  };*/

  const handleIncrease = (itemID, itemPrice) => {
    axios
      .patch(`http://localhost:4000/api/cart/updateCart/${shoppingCart._id}`, {
        cartItems: {
          product: itemID,
          quantity: +1,
          price: itemPrice,
        },
      })
      .then((res) => {
        setShoppingCart(res.data.cart);
        console.log(res.data.cart);
        itemQuantity();
      });
  };

  const handleDecrease = (itemID, itemPrice) => {
    axios
      .patch(`http://localhost:4000/api/cart/updateCart/${shoppingCart._id}`, {
        cartItems: {
          product: itemID,
          quantity: -1,
          price: -itemPrice,
        },
      })
      .then((res) => {
        setShoppingCart(res.data.cart);
        itemQuantity();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const checkOut = () => {
    navigate("/orders/delivery-details", { state: { cart: shoppingCart } });
  };

  // Calculate total quantity of items in the cart

  let totalQuantity = 0; // Initialize totalQuantity variable

  if (shoppingCart.cartItems) {
    // Check if shoppingCart.cartItems is defined
    totalQuantity = shoppingCart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  //Item quantity
  const itemQuantity = () => {
    const uniqueMainProducts = new Set(
      shoppingCart.cartItems.map((item) => item.product.productID)
    );
    setNumOfMainProducts(uniqueMainProducts.size);
  };

  const removeItem = (event, itemID) => {
    event.preventDefault();
    axios
      .delete(
        `http://localhost:4000/api/cart/deleteItem/${shoppingCart._id}/${itemID}`
      )
      .then((res) => {
        setShoppingCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            {!shoppingCart.msg || shoppingCart.cartItems.length > 0 ? (
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {numOfMainProducts} Items
                          </h6>
                        </div>
                        <hr className="my-4" />

                        {shoppingCart.cartItems &&
                          shoppingCart.cartItems.map((item) => (
                            <div
                              key={item.product.productID}
                              className="row mb-4 d-flex justify-content-between align-items-center"
                            >
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={`http://localhost:4000/${item.product.image}`}
                                  alt="product Image"
                                  className="rounded mr-2 mb-2"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    marginRight: "8px",
                                    marginBottom: "5px",
                                  }}
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">
                                  {item.product.category}
                                </h6>
                                <h6 className="text-black mb-0">
                                  {item.product.name}
                                </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    handleDecrease(
                                      item.product._id,
                                      item.product.price
                                    )
                                  }
                                >
                                  <i className="bi bi-dash"></i>
                                </button>

                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item.quantity}
                                  type="number"
                                  className="form-control form-control-sm"
                                  onChange={(e) =>
                                    setShoppingCart({
                                      ...shoppingCart,
                                      quantity: e.target.value,
                                    })
                                  }
                                />

                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    handleIncrease(
                                      item.product._id,
                                      item.product.price
                                    )
                                  }
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">${item.price}</h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a
                                  href="#!"
                                  className="text-muted"
                                  onClick={(e) => removeItem(e, item._id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </a>
                              </div>
                            </div>
                          ))}
                        <hr className="my-4" />
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <a href="/products/home" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">Items</h5>
                          <h5>{shoppingCart.totalPrice}</h5>
                        </div>
                        <h5 className="text-uppercase mb-3">Shipping</h5>
                        <div className="mb-4 pb-2">Shipping -</div>
                        <h5 className="text-uppercase mb-3">Give code</h5>
                        <div className="mb-5">
                          <div data-mdb-input-init className="form-outline">
                            <input
                              type="text"
                              id="form3Examplea2"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Examplea2"
                            >
                              Enter your code
                            </label>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>${shoppingCart.totalPrice}</h5>
                        </div>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={() => {
                            if (totalQuantity > 10) {
                              alert(
                                "You can only get a quotation as you have exceeded the maximum items limit."
                              );
                            } else {
                              checkOut();
                            }
                          }}
                          disabled={totalQuantity > 10}
                        >
                          Checkout
                        </button>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={() => {
                            checkOut();
                          }}
                        >
                          Get Quotation
                        </button>
                        {totalQuantity > 10 ? (
                          <div>
                            <p style={{ color: "red" }}>
                              You have exceeded the maximum items limit to
                              deliver(10).
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center" style={{ padding: "20px" }}>
                <h3
                  style={{
                    color: "#6c757d",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginTop: "20px",
                  }}
                >
                  Your cart is currently empty
                </h3>
                <p style={{ fontSize: "16px", color: "#6c757d" }}>
                  Visit our shop to add items to your cart.
                </p>
                <a
                  href="/products/home"
                  className="btn btn-primary btn-lg"
                  style={{ marginTop: "20px" }}
                >
                  Go to Shop
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShoppingCart;