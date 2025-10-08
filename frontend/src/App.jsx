import { useState } from "react";
import "./assets/css/style.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
