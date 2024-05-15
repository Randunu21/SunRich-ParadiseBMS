import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import SupplierForm from './pages/suppliers/suppliers';
import OrderComponent from './pages/suppliers/orderPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/suppliers/home' element={<SupplierForm/>}></Route>
          <Route path='/suppliers/order' element={<OrderComponent/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
