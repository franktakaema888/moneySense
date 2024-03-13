import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/userHome';
import { Info } from './pages/Info';
import { Login } from './pages/login';
import { Income } from './pages/income';
import { Expense } from './pages/expense';
import { Register } from './pages/register';
import { Navbar } from './components/navbar';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/home"element={<Home />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/register"element={<Register />}/>
          <Route path="/info"element={<Info />}/>
          <Route path="/income"element={<Income />}/>
          <Route path="/expense"element={<Expense />}/>
        </Routes>
        <div id='signInDiv'></div>
      </Router>

    </div>
  );
}

export default App;
