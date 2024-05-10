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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/orders/nav-bar" exact Component={Navbar} />
          <Route path="/orders/dashboard" exact Component={OrderHome} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
