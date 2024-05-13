import React, { useState } from "react";
import axios from "axios";
import { QrReader } from 'react-qr-reader';

const EmployeeAttendance = () => {
  const [scanResult, setScanResult] = useState("");

  const handleError = (error) => {
    console.error("QR Code Scanner Error:", error);
    setScanResult("Error with QR scanner: " + error.message);
  };

  const handleScan = async (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data.text);
        const response = await axios.post("http://localhost:4000/api/employees/attendance/mark-attendance", {
          employeeId: parsedData.EmployeeID,
          fullName: parsedData.FullName,
          NIC: parsedData.NIC,
          Email: parsedData.Email
        });
        setScanResult("Attendance marked successfully!");
      } catch (error) {
        console.error("Error marking attendance:", error);
        setScanResult("Failed to mark attendance. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Attendance</h2>
      <div className="text-center mb-4">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result);
            }
            if (!!error) {
              handleError(error);
            }
          }}
        />
      </div>
      {scanResult && (
        <div className="alert alert-info text-center" role="alert">
          {scanResult}
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
