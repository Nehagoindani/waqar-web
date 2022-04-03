import './App.css';
import Home from './View/Home';
import Bookings from './View/Bookings';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles.css';
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/bookings"  element={<Bookings/>} />
      </Routes>
    </Router>

  );
}

export default App;
