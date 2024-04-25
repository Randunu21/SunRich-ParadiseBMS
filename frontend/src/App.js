import Adminlogin from "./Admin/adminlogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryDetails from "./components/DeliveryDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import PendingOrder from "./components/PendingOrders";
import OngoingOrders from "./components/OngoingOrder";
import PastOrders from "./components/PastOrders";
import ShoppingCart from "./components/ShoppingCart";
import OrderHome from "./components/OrderHome";
import CustomerOrderHistory from "./components/CustomerOrderHistory";
import CustomerOrderTracking from "./components/CustomerOrderTrack";
//import AdminOrderProducts from "./components/AdminOrderProducts";
import CustomerQuotations from "./components/CustomerQuotations";
import AdminQuotationReply from "./components/AdminQuotationReply";
import AdminQuotationList from "./components/AdminQuotationList";
import Navbar from "./components/OrdersNavBar";
import Homepage from "./home/homepage";
import Navbar from "./home/navbar";
import Footer from "./home/footer";
import Rating from "./Admin/ratings";
import Dashboard from "./Admin/dashboard";
import AboutUsComponent from "./home/aboutuspage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/orders/nav-bar" exact Component={Navbar} />
          <Route path="/orders/" exact Component={OrderHome} />
          <Route
            path="/orders/delivery-details"
            exact
            Component={DeliveryDetails}
          />
          <Route path="/orders/pending-orders" exact Component={PendingOrder} />
          <Route
            path="/orders/ongoing-orders"
            exact
            Component={OngoingOrders}
          />
          <Route path="/orders/past-orders" exact Component={PastOrders} />
          <Route path="/orders/shopping-cart" exact Component={ShoppingCart} />
          <Route
            path="/orders/customer-order-history"
            exact
            Component={CustomerOrderHistory}
          />
          <Route
            path="/orders/customer-order-track"
            exact
            Component={CustomerOrderTracking}
          />

          <Route
            path="/orders/customer-quotations"
            exact
            Component={CustomerQuotations}
          />

          <Route
            path="/orders/admin-quotation-reply"
            exact
            Component={AdminQuotationReply}
          />

          <Route
            path="/orders/admin-quotation-list"
            exact
            Component={AdminQuotationList}
          />
          <Route path="/products/admin" element={<Adminlogin />} />
          <Route path="/products/" element={<Homepage />} />
          <Route path="/products/rating" element={<Rating />} />
          <Route path="/products/addp" element={<Dashboard />} />
          <Route path="/products/aboutus" element={<AboutUsComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
