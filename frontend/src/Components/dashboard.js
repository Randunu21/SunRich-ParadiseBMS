import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    productId: "",
    image: null,
    category: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);

  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    id: "",
    image: null,
    category: "",
  });
  const [products, setProducts] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProductIdToDelete, setSelectedProductIdToDelete] =
    useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/products/allproducts")
        .then((res) => {
          alert("ho");
          console.log("products", res.data);
          setProducts(res.data);
        });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditProduct({ ...editProduct, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("products", products);
      const existingProduct = products.find((p) => p.id === product.id);
      if (existingProduct) {
        toast.error("Product with the same Product ID already exists!");
        return;
      }

      console.log("product:", product);

      await axios.post(
        "http://localhost:4000/api/products/addproduct",
        product
      );
      handleClose();

      toast.success("Product added successfully", {
        autoClose: 3000,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleShow = () => {
    setProduct({
      name: "",
      description: "",
      price: "",
      discount: "",
      id: "",
      image: null,
      category: "",
    });
    setShow(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleShowEditModal = (product) => {
    setEditProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount: product.discount,
      id: product.id,
      image: product.image,
      category: product.category,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/products/${editProduct._id}`,
        editProduct
      );
      handleCloseEditModal();
      toast.success("Product updated successfully", { autoClose: 3000 });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    console.log("Selected product ID to delete:", id);
    setSelectedProductIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteProduct = async () => {
    try {
      // Check if selectedProductIdToDelete is defined
      if (selectedProductIdToDelete) {
        console.log(selectedProductIdToDelete);
        await axios.delete(
          `http://localhost:4000/api/products/removeproduct/${selectedProductIdToDelete}`
        );
        toast.success("Product deleted successfully", { autoClose: 3000 });
        fetchProducts();
        setShowDeleteConfirmation(false);
      } else {
        console.error("Error deleting product: No product ID selected");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-md-3">
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={handleShow}
          >
            Add Product
          </Button>
        </div>
        <div className="col-md-3">
          <a href="/rating" className="w-100 rating-pg-btn">
            Success
          </a>
        </div>
      </div>

      {/* --------------Add Product Modal Open------------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Coconut Product">Coconut Product</option>
                <option value="Spices Product">Spices Product</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* --------------Add Product Modal Close------------------- */}
      <ToastContainer />

      {/* --------------Show Product Table Open------------------- */}
      <div className="container">
        <h2 className="mt-4 mb-4">Product List</h2>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Description</th>
              <th>Normal Price</th>
              <th>Discount(%)</th>
              <th>Product ID</th>
              <th>Type</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {products ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>Rs : {product.price}</td>
                  <td>{product.discount} % </td>
                  <td>{product.productId}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-info"
                      onClick={() => handleShowEditModal(product)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteConfirmation(product._id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            )}
          </tbody>
          <tbody className="text-center">
            {products ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>Rs : {product.price}</td>
                  <td>{product.discount} % </td>
                  <td>{product.productId}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ maxWidth: "100px" }}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-info"
                      onClick={() => handleShowEditModal(product)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteConfirmation(product._id)}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* --------------Show Product Table Close------------------- */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editProduct.description}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={editProduct.category}
                onChange={handleEditChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Coconut Product">Coconut Product</option>
                <option value="Spices Product">Spices Product</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="editProductDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={editProduct.discount}
                onChange={handleEditChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="editProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleEditImageChange}
              />
              {editProduct.image && (
                <img
                  src={editProduct.image}
                  alt="Product"
                  style={{ maxWidth: "100px", marginTop: "10px" }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
