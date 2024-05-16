import React, { useRef } from "react";
import TopSellingProducts from "./TopSellingProducts";
import SalesByCategory from "./SalesByCategory";
import OrderStatistics from "./TotalOrders";
import { Route, Routes } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SalesReport = () => {
  const componentRef = useRef(null);

  const handlePrint = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("sales_report.pdf");
    });
  };

  return (
    <div className="container">
      <div ref={componentRef}>
        <TopSellingProducts />
        <SalesByCategory />
        <OrderStatistics />
      </div>
      <button className="btn btn-success" onClick={handlePrint}>
        Print Report
      </button>
    </div>
  );
};

export default SalesReport;
