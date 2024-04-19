import React from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assert/cart_icon.png'

const Navbar = () => {

  const [menu,setMenu] = useState("home")


  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Sun Rich Paradise</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}>Home{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("coconutrelated")}}>Coconut Related{menu==="coconutrelated"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("spices")}}>Spices{menu==="spices"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("aboutus")}}>About Us{menu==="aboutus"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("contactus")}}>Contact Us{menu==="contactus"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
         <button>Login</button>
         <img src={cart_icon} alt="" />
         <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar