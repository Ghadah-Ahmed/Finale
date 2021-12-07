import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log_in from './pages/signing_forms/Log_in';
import Sign_up from './pages/signing_forms/Sign_up';

function App() {
  return (
    <div className="App">
    <Router>
        <Routes> 
          <Route path="/" element={<Log_in/>}/>
          <Route path="/signup" element={<Sign_up/>}/> 
        </Routes>
    </Router>
    </div>
  );
}

export default App;
