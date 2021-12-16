import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log_in from './pages/signing_forms/Log_in';
import Sign_up from './pages/signing_forms/Sign_up';
import Menu from './pages/templates/first_template/Menu';
import Details from './pages/templates/first_template/Details';
import Cart from './pages/templates/first_template/Cart';
import Branch from './pages/dashboard/branch_dash/Branch';
import MainD from './pages/dashboard/main_dash/MainD';
import Orders from './pages/templates/first_template/Orders';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes> 
          {/* ////////////////signing_forms///////////////*/}
          <Route path="/" element={<Log_in/>}/>
          <Route path="/signup" element={<Sign_up/>}/> 

          {/* ////////////////dashboards///////////////*/}
          <Route path="/dash/:id/:id" element={<Branch/>}/> 
          <Route path="/dash/:id/" element={<MainD/>}/> 

          {/* ////////////////first_template ///////////////*/}
          <Route path="/menu/:id/:id" element={<Menu/>}/> 
          <Route path="/menu/:id/:id/detail/:itemId" element={<Details/>}/> 
          <Route path="/cart" element={<Cart/>}/> 
          <Route path="/orders" element={<Orders/>}/> 

        </Routes>
    </Router>
    </div>
  );
}

export default App;
