import './App.css';
import Home from './View/Home';
import Bookings from './View/Bookings';
import Products from './View/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles.css';
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bookings"  element={<Bookings/>} />
        <Route path="/Products"  element={<Products/>} />
      </Routes>
    </Router>

  );
}

export default App;
