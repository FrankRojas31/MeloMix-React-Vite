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
import '@madzadev/audio-player/dist/index.css'
import Page404 from './Paginas/404';
import Spotify from "./Paginas/spotify";

function App() {
  const token = localStorage.getItem("token");
  const userProfile = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const rolId = userProfile ? userProfile.Rol: null;
  console.log("Es tipo: " + rolId);
  const autenticado = token;

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Page404/>} />
          <Route path="/404" element={<Page404/>} />
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={autenticado && rolId === 1 ? <Dashboard /> : <Navigate to="/" />}/>
          <Route path="/inicio" element={autenticado ? <Navigate to = "/"/> : <Login />} />
          <Route path="/registro" element={autenticado ? <Navigate to = "/"/> : <Signin />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/musica" element={<Musica />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/usuario" element={autenticado ? <PUsuarios /> :<Navigate to ="/"/> }/>
          <Route path="/reproductor/:id" element={<RMusica />} />
          <Route path="/artista/:id" element={<Artista />} />
          <Route path="/spotify" element={<Spotify/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
