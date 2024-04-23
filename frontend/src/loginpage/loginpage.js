
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../profile/profile'; 
import image from '../img/1.png'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loggedIn, setLoggedIn] = useState(false); 
    const [user, setUser] = useState(null); 

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setLoggedIn(true);
                setUser(data.user);
                toast.success('Login successful!', { position: "top-center" });
            } else {
                if (response.status === 400 && data.message === 'Invalid Credentials') {
                    toast.error('Invalid email or password. Please try again.', { position: "top-center" });
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loggedIn && user) {
        return <Profile user={user} />;
    }

    return (
        <div className="container mt-5">
            <div className='row'>
            <div className='col-md-6 reg-cards ps-3 pe-3 pb-5'>
            <h1 className="mt-5">Login</h1>
            <form onSubmit={onSubmit} className="mt-3">
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <p className='mt-3'>Create account <a className='link' href='/reg'>Register Here</a></p>
            </form>
            </div>
            <div className='col-md-6'>
                <img src={image} className='w-50'/>
            </div>
            </div>
            
           
            <ToastContainer />
        </div>
    );
};

export default Login;
