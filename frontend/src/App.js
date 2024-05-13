import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AddEmployee from "./components/AddEmployee";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployeeTable from "./components/EmployeeTable";
import AdminEditEmployee from "./components/AdminEditEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeAdminDashboard from "./components/EmployeeAdminDashboard";
import EmployeeLeaveForm from "./components/AddEmployeeLeave";
import AddEmployeeLeave from "./components/AddEmployeeLeave";
import EmployeeLeaveTable from "./components/EmployeeLeaveTable";
import LoginForm from "./Login";
import AdminDashboard from "./components/adminDashboard"
import EmployeeProfileAdmin from "./components/EmployeeProfileAdmin";
import EmployeeAttendance from "./components/EmployeeAttendance";
import EmployeeAttendanceTable from "./components/EmployeeAttendanceTable";
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <Router>
      <div>
      <Header />
      
      <Navbar/>
       
      <Sidebar />
      
        <Routes>
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfile />} />
          <Route path="/employee-table" element={<EmployeeTable />} />
          <Route path="/employee-edit/:id" element={<EditEmployee />} />
          <Route path="/admin-employee-edit/:id" element={<AdminEditEmployee />} />
          <Route path="/employee-admin-dashboard"element={<EmployeeAdminDashboard/>} />
          <Route path="/employee-leave/:id"element={<AddEmployeeLeave/>} />
          <Route path="/employee-leave-table"element={<EmployeeLeaveTable/>} />
          <Route path="/login"element={<LoginForm/>} />
          <Route path="/adminpage"element={<AdminDashboard/>} />
          <Route path="/employee-profile-admin/:id"element={<EmployeeProfileAdmin/>} />
          <Route path="/employee-attendance"element={<EmployeeAttendance/>} />
          <Route path="/employee-attendance-table"element={<EmployeeAttendanceTable/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;