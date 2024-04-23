/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminOrderProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // Fetch products from the server
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Update total price when selected products change
  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = selectedProducts.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [selectedProducts]);

  // Handle quantity change for a selected product
  const handleQuantityChange = (productId, quantity) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  // Add a product to the selected products list
  const addProduct = (productId, productName, price) => {
    const isProductSelected = selectedProducts.some(
      (product) => product.id === productId
    );
    if (!isProductSelected) {
      setSelectedProducts([
        ...selectedProducts,
        { id: productId, name: productName, price: price, quantity: 1 },
      ]);
    }
  };

  /*const addCart = () => {
    axios
      .post("http://localhost:4000/api/cart/createCart", {
        userID: userID, //add correct values
        cartItems: cartItems, //add cartItems
        totalPrice: price, //add price
      })
      .then((res) => {
        navigate("/delivery-details" , {state : {cart: cartID}})
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Order</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">
            Select Product:
          </label>
          <select
            id="product"
            className="form-select"
            onChange={(e) =>
              addProduct(
                e.target.value,
                e.target.selectedOptions[0].text,
                e.target.selectedOptions[0].dataset.price
              )
            }
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
                data-price={product.price}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <h3>Selected Products</h3>
          <ul className="list-group">
            {selectedProducts.map((product) => (
              <li key={product.id} className="list-group-item">
                {product.name} -
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                  className="form-control form-control-sm mx-2 d-inline"
                  style={{ width: "80px" }}
                />
                Quantity
              </li>
            ))}
          </ul>
          <p className="mt-3">Total Price: ${totalPrice}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Order
        </button>
      </form>
    </div>
  );
};

export default AdminOrderProducts;*/
