import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    type: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('type', product.type);
    formData.append('image', product.image);

    try {
      await axios.post('http://localhost:4000/api/products/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Optionally, you can redirect the user or show a success message
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name:</label><br />
        <input type="text" id="productName" name="productName" value={product.productName} onChange={handleChange} required /><br /><br />
        
        <label htmlFor="description">Description:</label><br />
        <textarea id="description" name="description" value={product.description} onChange={handleChange} required></textarea><br /><br />
        
        <label htmlFor="price">Price:</label><br />
        <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required /><br /><br />
        
        <label htmlFor="type">Type:</label><br />
        <input type="text" id="type" name="type" value={product.type} onChange={handleChange} required /><br /><br />
        
        <label htmlFor="image">Image:</label><br />
        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required /><br /><br />
        
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
