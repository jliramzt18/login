import React from 'react'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Formulario from '../components/Formulario';
import Inicio from '../components/Inicio';

const MisRutas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login /> } />
            <Route path="/login" element={<Login /> } />
            <Route path="/formulario" element={<Formulario /> } />
            <Route path='/inicio' element={<Inicio />} />
        </Routes>
    </BrowserRouter>
  )
}

export default MisRutas