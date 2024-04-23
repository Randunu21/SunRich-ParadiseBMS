import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './regpage.css'
import image from '../img/2.png'

export default function RegPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
        gender: '',
        address: '',
        contactNumber: ''

    });
    const [passwordError, setPasswordError] = useState(false); 

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success('Registration successful!', { position: "top-center" });
            } else {
                if (response.status === 400 && data.message === 'Email is already associated with an account') {
                    toast.error('This email is already associated with an account.', { position: "top-center" });
                } else {
                    toast.error('Registration failed. Please try again.', { position: "top-center" });
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred. Please try again later.', { position: "top-center" });
        }
    };


    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 reg-cards pt-5 ps-3 pe-3 pb-5">
                    <h3 className='text-center'>Create Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input type="number" className="form-control" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea className="form-control" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                            <input type="text" maxLength={10} className="form-control" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                            {passwordError && <small className="text-danger">Passwords do not match.</small>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
                <div className='col-md-6'>
                   <img src={image} className='img-fluid w-100'/>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
