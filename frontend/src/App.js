import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryDetails from "./components/DeliveryDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import PendingOrder from "./components/PendingOrders";
import OngoingOrders from "./components/OngoingOrder";
import PastOrders from "./components/PastOrders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DeliveryDetails />
        <PendingOrder />
        <OngoingOrders />
        <PastOrders />
      </BrowserRouter>
    </div>
  );
}

export default App;
