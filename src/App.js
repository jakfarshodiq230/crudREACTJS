import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar'
import Pegawai from './component/Pegawai'
import PegawaiCreate from './component/PegawaiCreate'
import PegawaiUpdate from './component/PegawaiUpdate'

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact={true} element={<Pegawai />} />
        <Route path="/create" exact={true} element={<PegawaiCreate />} />
        <Route path="/update/:id" exact={true} element={<PegawaiUpdate />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
};