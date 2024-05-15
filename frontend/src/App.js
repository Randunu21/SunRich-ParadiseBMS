import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Trans from './pages/IncomeExpense/Trans';
import FinancialDashboard from './pages/IncomeExpense/Dashboard';
import Emppayroll from './pages/IncomeExpense/Emppayroll';
import Placeholder from './pages/IncomeExpense/EmpAdvancePage';
import AdminPage from './pages/adminPage';
import Testp from './pages/IncomeExpense/EmployeeAdvanceReqPage';
import EmpSalPage from './pages/IncomeExpense/EmpSalPage';
import SalaryDetails from './pages/IncomeExpense/Payrollp';
import AddEmployee from "./components/AddEmployee";
import EmployeeProfile from "./components/EmployeeProfile";
import EmployeeTable from "./components/EmployeeTable";
import AdminEditEmployee from "./components/AdminEditEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeAdminDashboard from "./components/EmployeeAdminDashboard";
import AddEmployeeLeave from "./components/AddEmployeeLeave";
import EmployeeLeaveTable from "./components/EmployeeLeaveTable";
import LoginForm from "./Login";
import AdminDashboard from "./components/adminDashboard"
import EmployeeProfileAdmin from "./components/EmployeeProfileAdmin";
import EmployeeAttendance from "./components/EmployeeAttendance";
import EmployeeAttendanceTable from "./components/EmployeeAttendanceTable";
import QrScanner from "./components/QrScanner";
import SupplierForm from './pages/suppliers/suppliers';
import OrderComponent from './pages/suppliers/orderPage';

function App() {
  return (
    <div>
      <BrowserRouter>
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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/adminpage" element={<AdminDashboard />} />
          <Route path="/employee-profile-admin/:id" element={<EmployeeProfileAdmin />} />
          <Route path="/employee-attendance" element={<EmployeeAttendance />} />
          <Route path="/employee-attendance-table" element={<EmployeeAttendanceTable />} />
          <Route path="/qr-scanner" element={<QrScanner />} />
          <Route path='/suppliers/home' element={<SupplierForm/>}></Route>
          <Route path='/suppliers/order' element={<OrderComponent/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;