
import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import Home from './Pages/ProductManagement/Home';
import HomeCategory from './Pages/ProductManagement/HomeCategory';
import LoginSignup from './Pages/ProductManagement/LoginSignup';
import Product from './Pages/ProductManagement/Product';
import Cart from './Pages/ProductManagement/Cart';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
  <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coconutrelated' element={<HomeCategory category="coconutrelated"/>}/>
      <Route path='/spices' element={<HomeCategory category="spices"/>}/>
      <Route path="product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  </div>
  );
}

export default App;
