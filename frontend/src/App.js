import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Trans from './pages/IncomeExpense/Trans';
import FinancialDashboard from './pages/IncomeExpense/Dashboard';
import Emppayroll from './pages/IncomeExpense/Emppayroll';
import Placeholder from './pages/IncomeExpense/EmpAdvancePage';
import AdminPage from './pages/adminPage';
import Testp from './pages/IncomeExpense/EmployeeAdvanceReqPage';
import EmpSalPage from './pages/IncomeExpense/EmpSalPage';
import SalaryDetails from './pages/IncomeExpense/Payrollp';
import AddEmployee from "./Components/AddEmployee";
import EmployeeProfile from "./Components/EmployeeProfile";
import EmployeeTable from "./Components/EmployeeTable";
import AdminEditEmployee from "./Components/AdminEditEmployee";
import EditEmployee from "./Components/EditEmployee";
import EmployeeAdminDashboard from "./Components/EmployeeAdminDashboard";
import AddEmployeeLeave from "./Components/AddEmployeeLeave";
import EmployeeLeaveTable from "./Components/EmployeeLeaveTable";
import LeaveReportPage from './Components/LeaveReportPage';
import EmpLoginForm from "./Login";
import AdminDashboard from "./Components/adminDashboard"
import EmployeeProfileAdmin from "./Components/EmployeeProfileAdmin";
import EmployeeAttendance from "./Components/EmployeeAttendance";
import EmployeeAttendanceTable from "./Components/EmployeeAttendanceTable";
import QrScanner from "./Components/QrScanner";
import SupplierForm from './pages/suppliers/suppliers';
import OrderComponent from './pages/suppliers/orderPage';
import Regpage from "./regpage/regpage";
import Login from "./loginpage/loginpage";
import Adminlogin from "./adminLogin/adminlogin";
import Report from "./adminLogin/reportGen";
import HomePage from "./first/fpage";
import image from './img/logo.png';
import RegUserMgmt from "./adminLogin/regUserMgmt"; 

//orders
import DeliveryDetails from "./Components/DeliveryDetails";
import PendingOrder from "./Components/PendingOrders";
import OngoingOrders from "./Components/OngoingOrder";
import PastOrders from "./Components/PastOrders";
import ShoppingCart from "./Components/ShoppingCart";
import OrderHome from "./Components/OrderHome";
import CustomerOrderHistory from "./Components/CustomerOrderHistory";
import CustomerOrderTracking from "./Components/CustomerOrderTrack";
//import AdminOrderProducts from "./Components/AdminOrderProducts";
import CustomerQuotations from "./Components/CustomerQuotations";
import AdminQuotationReply from "./Components/AdminQuotationReply";
import AdminQuotationList from "./Components/AdminQuotationList";
import OrdersNavbar from "./Components/OrdersNavBar";
import PaypalCheckoutButton from "./Components/PaypalCheckoutButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import SalesReport from "./Components/SalesReport";

//products

import Home from "./pages/Home";
import HomeCategory from "./pages/HomeCategory";
import Product from "./pages/Product";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Ratings from "./Components/ratings";
import Dashboard from "./Components/dashboard";

//QM
import AddFeedback from "./Components/AddFeedback";
import AddInquiry from "./Components/AddInquiry";
import QmDashboard from "./QualityManager/QmDashboard";
import QualityManagerTable from "./Components/InquiryReply";
import ProductDetails from "./Components/DisplayFeedback";
import InquiriesTable from "./Components/InquiryList";
import DisplayFeedback from "./Components/DisplayFeedback";
import AdminReport from "./QualityManager/AdminReport";

//login
import LoginForm from "./Components/Login";

function App() {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWw2oafpWLEzaeTqAhgw9VZYy8W06api38yC1cY8gQ5RQA-SWmgo5kbo312eUHDd7hsQCGgtrWEpwa3u",
        }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path='/Financial/trans' element={<Trans />}></Route>
          <Route path='/Financial/dash' element={<FinancialDashboard />}></Route>
          <Route path='/Financial/payroll' element={<Emppayroll />}></Route>
          <Route path='/Financial/place' element={<Placeholder />}></Route>
          <Route path='/Financial/empsal' element={<EmpSalPage />}></Route>
          <Route path='/Financial/adminpage' element={<AdminPage />}></Route>
          <Route path='/Financial/pp' element={<SalaryDetails />}></Route>
          <Route path='/Financial/tp' element={<Testp />}></Route>
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
          <Route path="/employee-table" element={<EmployeeTable />} />
          <Route path="/employee-edit/:id" element={<EditEmployee />} />
          <Route path="/admin-employee-edit/:id" element={<AdminEditEmployee />} />
          <Route path="/employee-admin-dashboard" element={<EmployeeAdminDashboard />} />
          <Route path="/employee-leave/:id" element={<AddEmployeeLeave />} />
          <Route path="/employee-leave-table" element={<EmployeeLeaveTable />} />
          <Route path="/leave-report" element={<LeaveReportPage/>} />
          <Route path="/login" element={<EmpLoginForm />} />
          <Route path="/adminpage" element={<AdminDashboard />} />
          <Route path="/employee-profile-admin/:id" element={<EmployeeProfileAdmin />} />
          <Route path="/employee-attendance" element={<EmployeeAttendance />} />
          <Route path="/employee-attendance-table" element={<EmployeeAttendanceTable />} />
          <Route path="/qr-scanner" element={<QrScanner />} />
          <Route path='/suppliers/home' element={<SupplierForm/>}></Route>
          <Route path='/suppliers/order' element={<OrderComponent/>}></Route>
          <Route path="/reg" element={<Regpage />} />
          <Route path="/log" element={<Login />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/report" element={<Report />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/adminD" element={<Home/>} />
          <Route path="/registered" element={<RegUserMgmt/>} />

          
            {/*login*/}
            <Route path="/Login" element={<LoginForm />} />
            {/*order Routes*/}
            <Route path="/orders/nav-bar" element={<OrdersNavbar />} />
            <Route path="/orders/dashboard" element={<OrderHome />} />
            <Route path="/orders/sales-report" element={<SalesReport />} />
            <Route
              path="/orders/delivery-details"
              element={<DeliveryDetails />}
            />
            <Route path="/orders/pending-orders" element={<PendingOrder />} />
            <Route path="/orders/ongoing-orders" element={<OngoingOrders />} />
            <Route path="/orders/past-orders" element={<PastOrders />} />
            <Route path="/orders/shopping-cart" element={<ShoppingCart />} />
            <Route
              path="/orders/customer-order-history"
              element={<CustomerOrderHistory />}
            />
            <Route
              path="/orders/customer-order-track"
              element={<CustomerOrderTracking />}
            />
            <Route
              path="/orders/customer-quotations"
              element={<CustomerQuotations />}
            />
            <Route
              path="/orders/admin-quotation-reply"
              element={<AdminQuotationReply />}
            />
            <Route
              path="/orders/admin-quotation-list"
              element={<AdminQuotationList />}
            />
            <Route
              path="/paypal/button"
              exact
              component={PaypalCheckoutButton}
            />
            {/*products*/}
            <Route path="/products/home" element={<Home />} />
            <Route
              path="/products/coconutrelated"
              element={<HomeCategory category="Coconut Product" />}
            />
            <Route path="/products/rating" element={<Ratings />} />
            <Route
              path="/products/spices"
              element={<HomeCategory category="Spices Product" />}
            />
            <Route path="/products/dashboard" element={<Dashboard />} />
            <Route path="product" element={<Product />}>
              <Route path=":productID" element={<Product />} />
            </Route>
            <Route path="/quality/dashboard" element={<QmDashboard />} />
            <Route
              path="/quality-manager/inquiries"
              element={<QualityManagerTable />}
            />
            <Route
              path="/quality-manager/feedbacks"
              element={<DisplayFeedback />}
            />{" "}
            <Route path="/quality/inquiry" element={<AddInquiry />} />
            <Route path="/quality/inquiry-list" element={<InquiriesTable />} />
            <Route
              path="/quality/quality-manager/reports"
              element={<AdminReport />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;