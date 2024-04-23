import Regpage from "./regpage/regpage";
import Login from "./loginpage/loginpage";
import Adminlogin from "./adminLogin/adminlogin";
import Dashbord from "./adminLogin/dashbord";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      
    <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Your Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/reg">Register</Nav.Link>
                    <Nav.Link href="/log">Login</Nav.Link>

                </Nav>
            </Navbar.Collapse>
    </Navbar>

      <BrowserRouter>
      <Routes>
        <Route path="/reg" element={<Regpage/>} />
        <Route path="/log" element={<Login/>} />
        <Route path="/admin" element={<Adminlogin/>} />
        <Route path="/dashboard" component={<Dashbord/>} />
      </Routes>
    </BrowserRouter>




    </div>
  );
}

export default App;
