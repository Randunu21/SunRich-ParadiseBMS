import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryDetails from "./components/DeliveryDetails";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DeliveryDetails />
      </BrowserRouter>
    </div>
  );
}

export default App;
