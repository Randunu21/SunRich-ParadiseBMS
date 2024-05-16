import React from "react";
import TopSellingProducts from "./TopSellingProducts";
import SalesByCategory from "./SalesByCategory";
import OrderStatistics from "./TotalOrders";
import { Route, Routes } from "react-router-dom";
const SalesReport = () => {
  return (
    <div>
      <TopSellingProducts />
      <SalesByCategory />
      <OrderStatistics />
    </div>
  );
};

export default SalesReport;
