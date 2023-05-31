import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState, useHistory } from "react";
import './App.css';

import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import Graphs from './pages/Graphs';

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path="/graphs" element={<Graphs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
