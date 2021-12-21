import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log_in from './pages/signing_forms/Log_in';
import Sign_up from './pages/signing_forms/Sign_up';
import Menu from './pages/templates/first_template/Menu';
import Details from './pages/templates/first_template/Details';
import Cart from './pages/templates/first_template/Cart';
import Branch from './pages/dashboard/branch_dash/Branch';
import MainD from './pages/dashboard/main_dash/MainD';
import Orders from './pages/templates/first_template/Orders';
import axios from 'axios';


const authAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
export const AuthAxiosContext = React.createContext(authAxios);
export const LanguageContext = React.createContext()

function App() {
  const [lang, setLang] = React.useState('ar');

  return (
    <AuthAxiosContext.Provider value={authAxios}>
       <LanguageContext.Provider value={{lang, setLang}}>
    <div className="App">
    <Router>
        <Routes> 
          {/* ////////////////signing_forms///////////////*/}
          <Route path="/login" element={<Log_in/>}/>
          <Route path="/signup" element={<Sign_up/>}/> 

          {/* ////////////////dashboards///////////////*/}
          <Route path="/dash/:adminId/:branchId" element={<Branch/>}/> 
          <Route path="/dash/:adminId/" element={<MainD/>}/> 

          {/* ////////////////first_template ///////////////*/}
          <Route path="/menu/:adminId/:branchId" element={<Menu/>}/> 
          <Route path="/menu/:adminId/:branchId/detail/:itemId" element={<Details/>}/> 
          <Route path="/cart/:adminId/:branchId" element={<Cart/>}/> 
          <Route path="/orders/:adminId/:branchId" element={<Orders/>}/> 
          <Route path="*" component={() => '404 NOT FOUND'}/> 

        </Routes>
    </Router>
    </div>
      </LanguageContext.Provider>
    </AuthAxiosContext.Provider>
  );
}

export default App;
