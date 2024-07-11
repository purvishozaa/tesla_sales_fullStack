import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import LogOut from "./components/LogOut/LogOut";

import BatteryCatalog from "./components/BatteryCatalog/BatteryCatalog";

const App = () => {
  return (
    <div>
    <Router>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/battery-configuration" element={<BatteryCatalog />} />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </div>
  );
};

export default App;
