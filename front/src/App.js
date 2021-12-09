import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log_in from './pages/signing_forms/Log_in';
import Sign_up from './pages/signing_forms/Sign_up';
import Menu from './pages/templates/first_template/Menu';
import Details from './pages/templates/first_template/Details';
import Cart from './pages/templates/first_template/Cart';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes> 
          <Route path="/" element={<Log_in/>}/>
          <Route path="/signup" element={<Sign_up/>}/> 

          {/* ////////////////first_template ///////////////*/}
          <Route path="/menu/:id/:id" element={<Menu/>}/> 
          <Route path="/menu/:id/:id/detail/:itemId" element={<Details/>}/> 
          <Route path="/cart" element={<Cart/>}/> 

        </Routes>
    </Router>
    </div>
  );
}

export default App;
