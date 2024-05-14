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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/Financial/trans' element={<Trans/>}></Route>
          <Route path='/Financial/dash' element={<FinancialDashboard/>}></Route>
          <Route path='/Financial/payroll' element={<Emppayroll/>}></Route>
          <Route path='/Financial/place' element={<Placeholder/>}></Route>
          <Route path='/Financial/empsal' element={<EmpSalPage/>}></Route>
          <Route path='/Financial/adminpage' element={<AdminPage/>}></Route>
          <Route path='/Financial/pp' element={<SalaryDetails/>}></Route>
          <Route path='/Financial/tp' element={<Testp/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
