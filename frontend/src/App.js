import Adminlogin from "./Admin/adminlogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./home/homepage";
import Navbar from "./home/navbar";
import Footer from "./home/footer";
import Rating from "./Admin/ratings";
import Dashboard from "./Admin/dashboard";
import AboutUsComponent from "./home/aboutuspage";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/addp" element={<Dashboard />} />
          <Route path="/aboutus" element={<AboutUsComponent />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
