import React, { useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import axios from "axios";
import { debounce } from "lodash";

const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentCart, setCurrentCart] = useState("");
  const userID = 9;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/cart/userCart/${userID}`)
      .then((res) => {
        setCurrentCart(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value >= 1 ? value : 1); // Ensure quantity doesn't go below 0
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  const addToCartDebounce = debounce((productID) => {
    addToCart(productID);
  }, 1000); //no clicking for 1 second

  const addToCart = (productID) => {
    let price = Number(product.price * quantity);
    console.log(price);

    const data = {
      cartItems: {
        product: productID,
        quantity: quantity,
        price: price,
      },
    };

    if (currentCart.msg) {
      console.log("hi bro");
      axios
        .post("http://localhost:4000/api/cart/createCart", {
          userID: userID,
          cartItems: [
            {
              product: productID,
              quantity: quantity,
              price: price,
            },
          ],
        })
        .then((res) => {
          setCurrentCart(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("bye bro");
      console.log(currentCart._id);
      axios
        .patch(
          `http://localhost:4000/api/cart/updateCart/${currentCart._id}`,
          data
        )
        .then((res) => {
          setCurrentCart(res.data.cart);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {Array.from({ length: 4 }, (_, i) => (
            <img key={i} src={product.image} alt="img" />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {Array.from({ length: 4 }, () => (
            <img src={star_icon} alt="" />
          ))}
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">${product.price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Quantity</h1>
          <div className="productdisplay-right-sizes">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
        <button onClick={() => addToCartDebounce(product._id)}>
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
