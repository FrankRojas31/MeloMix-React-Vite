import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Index from './Paginas';
import Dashboard from './Paginas/dashboard';
import Login from './Paginas/login';
import Signin from './Paginas/signin';
import Nosotros from './Paginas/Nosotros';
import Musica from './Paginas/Musica';
import Artistas from './Paginas/Artistas';
import Noticias from './Paginas/Noticias';
import PUsuarios from './Paginas/PUsuario';
import RMusica from './Paginas/RMusica';
import Artista from './Paginas/Artista';
import Gobierno from './Paginas/Gobierno';

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inicio" element={<Login />} />
          <Route path="/registro" element={<Signin />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/usuario" element={<PUsuarios />} />
          <Route path="/reproductor/:id" element={<RMusica />} />
          <Route path="/artista/:id" element={<Artista />} />
          <Route path="/gobierno" element={<Gobierno />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
