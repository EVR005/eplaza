import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login.js";
import Signup from "./Components/signup.js";
import Shopping from "./Components/shopping";
import Cart from "./Components/cart";
import Otp from "./Components/otp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/shopping" element={<Shopping />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/otp" element={<Otp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
