import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS

import QualityManagerTable from '../Components/InquiryReply'; // Assuming InquiryReply is the correct component name
import DisplayFeedback from '../Components/AdminFeedback';
import GenerateReport from '../Components/AdminReport';

const QmDashboard = () => {
  return (
    <div className="qm-dashboard container-fluid d-flex flex-column min-vh-100 bg-dark text-white">
      <header className="qm-header row flex-grow-0 bg-success text-white align-items-center">
        <h1 className="col-12 qm-heading text-center">Quality Manager Dashboard</h1>
      </header>
      <nav className="qm-nav row justify-content-center">
        <ul className="nav col-md-8 d-flex flex-wrap justify-content-between custom-nav"> {/* Use custom-nav for custom styles */}
          <li className="nav-item">
            <Link to="/quality-manager/feedbacks" className="nav-link active text-white">
              Feedbacks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quality-manager/inquiries" className="nav-link text-white">
              Inquiries
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/quality-manager/reports" className="nav-link text-white">
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      <div className="qm-content row flex-grow-1">
        <div className="col-12">
          <Routes>
            <Route path="/quality-manager/feedbacks" element={<DisplayFeedback />} />
            <Route path="/quality-manager/inquiries" element={<QualityManagerTable />} />
            <Route path="/quality-manager/reports" element={<GenerateReport />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default QmDashboard;
