import { BrowserRouter, Routes, Route } from "react-router-dom";

//orders
import DeliveryDetails from "./Components/DeliveryDetails";
import PendingOrder from "./Components/PendingOrders";
import OngoingOrders from "./Components/OngoingOrder";
import PastOrders from "./Components/PastOrders";
import ShoppingCart from "./Components/ShoppingCart";
import OrderHome from "./Components/OrderHome";
import CustomerOrderHistory from "./Components/CustomerOrderHistory";
import CustomerOrderTracking from "./Components/CustomerOrderTrack";
//import AdminOrderProducts from "./Components/AdminOrderProducts";
import CustomerQuotations from "./Components/CustomerQuotations";
import AdminQuotationReply from "./Components/AdminQuotationReply";
import AdminQuotationList from "./Components/AdminQuotationList";
import OrdersNavbar from "./Components/OrdersNavBar";
import "bootstrap/dist/css/bootstrap.min.css";

//products

import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Ratings from "./Components/ratings";
import Dashboard from "./Components/dashboard";

//QM
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
          {/*order Routes*/}
          <Route path="/orders/nav-bar" element={<OrdersNavbar />} />
          <Route path="/orders/dashboard" element={<OrderHome />} />
          <Route
            path="/orders/delivery-details"
            element={<DeliveryDetails />}
          />
          <Route path="/orders/pending-orders" element={<PendingOrder />} />
          <Route path="/orders/ongoing-orders" element={<OngoingOrders />} />
          <Route path="/orders/past-orders" element={<PastOrders />} />
          <Route path="/orders/shopping-cart" element={<ShoppingCart />} />
          <Route
            path="/orders/customer-order-history"
            element={<CustomerOrderHistory />}
          />
          <Route
            path="/orders/customer-order-track"
            element={<CustomerOrderTracking />}
          />
          <Route
            path="/orders/customer-quotations"
            element={<CustomerQuotations />}
          />
          <Route
            path="/orders/admin-quotation-reply"
            element={<AdminQuotationReply />}
          />
          <Route
            path="/orders/admin-quotation-list"
            element={<AdminQuotationList />}
          />
          {/*products*/}
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
