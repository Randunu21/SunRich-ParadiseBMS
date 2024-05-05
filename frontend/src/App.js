import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/coconutrelated"
            element={<HomeCategory category="coconut" />}
          />
          <Route path="/spices" element={<HomeCategory category="spices" />} />
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
