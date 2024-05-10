import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Ratings from "./Components/ratings";
import Dashboard from "./Components/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import AddFeedback from "./Components/AddFeedback";
import AddInquiry from "./Components/AddInquiry";
import QmDashboard from "./QualityManager/QmDashboard";
import QualityManagerTable from "./Components/InquiryReply";
import ProductDetails from "./Components/DisplayFeedback";
import InquiriesTable from "./Components/InquiryList";
import DisplayFeedback from "./Components/DisplayFeedback";
import AdminReport from "./QualityManager/AdminReport";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/products/home" element={<Home />} />
          <Route
            path="/products/coconutrelated"
            element={<HomeCategory category="Coconut Product" />}
          />
          <Route path="/products/rating" element={<Ratings />} />
          <Route
            path="/products/spices"
            element={<HomeCategory category="Spices Product" />}
          />
          <Route path="/products/dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/quality/dashboard" element={<QmDashboard />} />
          <Route
            path="/quality-manager/inquiries"
            element={<QualityManagerTable />}
          />
          <Route
            path="/quality-manager/feedbacks"
            element={<DisplayFeedback />}
          />{" "}
          <Route path="/quality/inquiry" element={<AddInquiry />} />
          <Route path="/quality/inquiry-list" element={<InquiriesTable />} />
          <Route
            path="/quality/quality-manager/reports"
            element={<AdminReport />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
