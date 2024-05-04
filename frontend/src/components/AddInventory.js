import React, { useState, useEffect } from 'react';
import axios from 'axios';
import{useNavigate} from 'react-router-dom';

export default function AddInventory() {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [createdAt, setCreatedAt] = useState(''); 
  const [message, setMessage] = useState('');  
 
  // useEffect(() => {
  //   axios.get('/api/products')
  //     .then(response => {
  //       setProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //     });
  // }, []);

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        code: code,
        name: name,
        description:description,
        category:category,
        quantity:quantity,
        supplier:supplier,
        createdAt:createdAt
      }

      console.log(data);

      // {
      //   code: code,
      //   name: name,
      //   description:description,
      //   category:category,
      //   quantity:quantity,
      //   supplier:supplier,
      //   createdAt:createdAt
        
      // }

    try {
      const response = await axios.post('http://localhost:5000/Inventory/add', data);
      setProducts([...products, response.data]); // Update products state with the newly added product

      setMessage('Product added successfully!');
      clearFields();

    } catch (error) {
      setMessage('Failed to add product. Please try again.');
      console.error('Error adding product:', error);
    }
  };

  const clearFields =() =>{
    setCode('');
    setName('');
    setDescription('');
    setCategory('');
    setQuantity('');
    setSupplier('');
    setCreatedAt('');

  }

  const handleClick = () => {
    navigate.push('/ViewInventory'); // Redirect to the added inventory page
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-6">Add Products</h1>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="code">Item Code:</label>
          <input
            type="text"
            id="code"
            className="form-control rounded-pill"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Item Name:</label>
          <input
            type="text"
            id="name"
            className="form-control rounded-pill"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Item Description:</label>
          <input
            type="text"
            id="description"
            className="form-control rounded-pill"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Item Category :</label>
          <input
            type="text"
            id="category"
            className="form-control rounded-pill"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Item Quantity:</label>
          <input
            type="text"
            id="quantity"
            className="form-control rounded-pill"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplier">Supplier :</label>
          <input
            type="text"
            id="supplier"
            className="form-control rounded-pill"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="createdAt">Item Creation Date :</label>
          <input
            type="text"
            id="createdAt"
            className="form-control rounded-pill"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Item </button>

      </form>

      <button onClick={handleClick} className="btn btn-success mt-3">View Inventory</button> {/* Button to view inventory */}

      {message && <p className="mt-3">{message}</p>}
      {/* <h2 className="mt-5">Products</h2> */}
      <ul className="list-group mt-3">
        {products.map(product => (
          <li key={product._id} className="list-group-item">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
