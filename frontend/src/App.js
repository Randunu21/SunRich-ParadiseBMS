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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={OrderHome} />
          <Route path="/delivery-details" exact Component={DeliveryDetails} />
          <Route path="/pending-orders" exact Component={PendingOrder} />
          <Route path="/ongoing-orders" exact Component={OngoingOrders} />
          <Route path="/past-orders" exact Component={PastOrders} />
          <Route path="/shopping-cart" exact Component={ShoppingCart} />
          <Route
            path="/customer-order-history"
            exact
            Component={CustomerOrderHistory}
          />
          <Route
            path="/customer-order-track"
            exact
            Component={CustomerOrderTracking}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
