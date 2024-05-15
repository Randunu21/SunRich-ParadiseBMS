import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap';
import Regpage from "./regpage/regpage";
import Login from "./loginpage/loginpage";
import Adminlogin from "./adminLogin/adminlogin";
import Report from "./adminLogin/reportGen";
import HomePage from "./first/fpage";
import image from './img/logo.png';
import Home from "./adminLogin/adminMain";
import RegUserMgmt from "./adminLogin/regUserMgmt"; 


function App() {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={image} alt="Your Image" className="img-fluid" width="50" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/reg">Register</Nav.Link>
              <Nav.Link href="/log">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        

        <Routes>

          <Route path="/reg" element={<Regpage />} />
          <Route path="/log" element={<Login />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/adminD" element={<Home/>} />
          <Route path="/registered" element={<RegUserMgmt/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
