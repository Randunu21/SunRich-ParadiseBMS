import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Trans from './pages/IncomeExpense/Trans';
import Dashboard from './pages/IncomeExpense/Dashboard';
import LoginPage from './pages/Loginpage';
import Emppayroll from './pages/IncomeExpense/Emppayroll';
import Placeholder from './pages/IncomeExpense/Placeholder';
import PayrollPortal from './pages/IncomeExpense/PayrollPortal';
import DummyPage from './pages/IncomeExpense/DummyPage';
import Login from './pages/Login';
import CusReg from './pages/CusReg'
import EmpReg from './pages/EmpReg'
import CustomerPage from './pages/customerPage';
import AdminPage from './pages/adminPage'
;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Trans/>}></Route>
          <Route path='/dash' element={<Dashboard/>}></Route>
          <Route path='/loginpage' element={<LoginPage/>}></Route>
          <Route path='/payroll' element={<Emppayroll/>}></Route>
          <Route path='/place' element={<Placeholder/>}></Route>
          <Route path='/pportal' element={<PayrollPortal/>}></Route>
          <Route path='/dummy' element={<DummyPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/cusreg' element={<CusReg/>}></Route>
          <Route path='/empreg' element={<EmpReg/>}></Route>
          <Route path='/cuspage' element={<CustomerPage/>}></Route>
          <Route path='/adminpage' element={<AdminPage/>}></Route>
          <Route path='/test' element={<LoginPage/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
