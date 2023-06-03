import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState, useHistory } from "react";
import './App.css';

import AdminPage from './pages/AdminPage';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import SoundGraph from './pages/SoundGraph';
import TemperatureGraph from './pages/TemperatureGraph';
import HumidityGraph from './pages/HumidityGraph';
import NumOfPeopleGraph from './pages/NumOfPeopleGraph';

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path="/temperature" element={<TemperatureGraph />}></Route>
        <Route exact path="/humidity" element={<HumidityGraph />}></Route>
        <Route exact path="/people" element={<NumOfPeopleGraph />}></Route>
        <Route exact path="/sound" element={<SoundGraph />}></Route>
        <Route exact path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
