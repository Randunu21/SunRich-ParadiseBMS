import React, { useState, useEffect } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { debounce } from "lodash";

const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentCart, setCurrentCart] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [show, setShow] = useState(false);
  const userID = 69;

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

  const handleClose = () => {
    setShow(false);
    window.location.reload(); // Refresh the page
  };
  const handleShow = () => setShow(true);

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
    console.log("productID:", productID);
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

  const saveRating = async (productID) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/rating",
        {
          productID: productID,
          ratingValue: ratingValue,
        }
      );
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("Error saving rating:", error);
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
        <button
          onClick={() => {
            handleShow();
          }}
        >
          Review Product
        </button>
        <p className="productdisplay-right-category">
          <span>Category :</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> {product.category}
        </p>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="h3">Add your valueble rating</p>
          <div class="rating">
            <input
              type="radio"
              id="star5"
              name="rating"
              value="5"
              onChange={() => setRatingValue(5)}
            />
            <label for="star5">5</label>
            <input
              type="radio"
              id="star4"
              name="rating"
              value="4"
              onChange={() => setRatingValue(4)}
            />
            <label for="star4">4</label>
            <input
              type="radio"
              id="star3"
              name="rating"
              value="3"
              onChange={() => setRatingValue(3)}
            />
            <label for="star3">3</label>
            <input
              type="radio"
              id="star2"
              name="rating"
              value="2"
              onChange={() => setRatingValue(2)}
            />
            <label for="star2">2</label>
            <input
              type="radio"
              id="star1"
              name="rating"
              value="1"
              onChange={() => setRatingValue(1)}
            />
            <label for="star1">1</label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            className="w-100"
            onClick={() => {
              saveRating(product.productID);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDisplay;
