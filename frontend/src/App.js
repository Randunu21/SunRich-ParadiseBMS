import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<QmDashboard />} />
          <Route
            path="/quality-manager/inquiries"
            element={<QualityManagerTable />}
          />
          <Route
            path="/quality-manager/feedbacks"
            element={<DisplayFeedback />}
          />{" "}
          <Route path="/inquiry" element={<AddInquiry />} />
          <Route path="/inquiry-list" element={<InquiriesTable />} />
          <Route path="/quality-manager/reports" element={<AdminReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
