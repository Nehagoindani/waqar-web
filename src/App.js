import './App.css';
import Home from './View/Home';
import Bookings from './View/Bookings';
import Products from './View/Products';
import Salesheet from './View/Salesheet';
import Navbar from './Layout/Navbar';
import Login from './View/LoginForm';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles.css';
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    localStorage.setItem('loggedIn', false)
  }, [])

  //yhn pr condition lgegi keh logged in agr true hay tw private routes pr jaye wrna public route pr

  return (

    <Router>
      {
        localStorage.getItem('loggedIn') == true ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Salesheet" element={<Salesheet />} />
            </Routes>
          </>
        ) : <Login/>
      }
    </Router>

  );
}

export default App;
