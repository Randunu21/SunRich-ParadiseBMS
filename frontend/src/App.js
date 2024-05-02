import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddFeedback from "./Components/AddFeedback";
import AddInquiry from "./Components/AddInquiry";
import QmDashboard from "./QualityManager/QmDashboard";
import QualityManagerTable from "./Components/InquiryReply"; 
import ProductDetails from "./Components/DisplayFeedback";
import InquiriesTable from "./Components/InquiryList";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ProductDetails/>} />
          <Route path="/quality-manager/inquiries" element={<QualityManagerTable />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
