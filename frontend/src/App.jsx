import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import CreateForm from "./form/CreateForm"
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CreateForm />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
