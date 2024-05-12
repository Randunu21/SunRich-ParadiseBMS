import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import QualityManagerTable from "../Components/InquiryReply";
import DisplayFeedback from "../QualityManager/AdminFeedback";
import GenerateReport from "../QualityManager/AdminReport";

import {
  BsChatDots,
  BsFillFileEarmarkTextFill,
  BsGraphUp,
} from "react-icons/bs";
import "../Components/QmDashboard.css"; // Import the main CSS file
import ReportGenerationModel from "./ReportGenerationModel";

const QmDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFeedbackReportClick = () => {
    // Redirect to feedback report page
    console.log("Redirecting to feedback report page");
  };

  const handleInquiryReportClick = () => {
    // Redirect to inquiry report page
    console.log("Redirecting to inquiry report page");
  };

  return (
    <div className="qm-dashboard container-fluid d-flex flex-column min-vh-100 bg-dark text-white">
      <header className="qm-header row flex-grow-0 bg-success text-white align-items-center">
        <h1 className="col-12 qm-heading text-center">
          Quality Manager Dashboard
        </h1>
      </header>
      <nav className="qm-nav row justify-content-center">
        <ul className="nav col-md-8 d-flex flex-wrap justify-content-between custom-nav">
          <li className="nav-item">
            <Link
              to="/quality-manager/inquiries"
              className="nav-link text-white"
            >
              <div className="dashboard-button">
                <BsChatDots className="dashboard-icon" />
                <span className="dashboard-text">Inquiry Management</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/quality-manager/feedbacks"
              className="nav-link text-white"
            >
              <div className="dashboard-button">
                <BsFillFileEarmarkTextFill className="dashboard-icon" />
                <span className="dashboard-text">Feedback Management</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <button className="dashboard-button" onClick={toggleModal}>
              <BsGraphUp className="dashboard-icon" />
              <span className="dashboard-text">Report Generation</span>
            </button>
          </li>
        </ul>
      </nav>
      {showModal && <div className="blurred-background"></div>}
      {showModal && (
        <div className="report-modal-container">
          <div className="report-modal">
            <ReportGenerationModel
              onClose={toggleModal}
              onFeedbackReportClick={handleFeedbackReportClick}
              onInquiryReportClick={handleInquiryReportClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QmDashboard;
