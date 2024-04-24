import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatButton from "./Components/InquiryButton";
import AddInquiry from "./Components/AddInquiry";
import AddFeedback from "./Components/AddFeedback";
import ProductDetails from "./Components/DisplayFeedback";
import InquiriesTable from "./Components/InquiryList";
import QualityManagerTable from "./Components/InquiryDashboard";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<QualityManagerTable/>} />
          <Route path="/addInquiry" element={<AddInquiry/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
