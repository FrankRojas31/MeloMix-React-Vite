import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as jwtDecode from 'jwt-decode'; // Instalar esto para que se pueda decodificar.


export default function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [inicio, setInicio] = useState(false);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("perfil");
    const storedToken = localStorage.getItem("token");
  
    if (storedUserProfile) {
      const userProfile = JSON.parse(storedUserProfile);
      setProfile(userProfile);
      setInicio(true);
    }
    if (storedToken) {
      const decodedToken = jwtDecode.default(storedToken);;
      setProfile({
        Id_usuario: decodedToken.id, 
        Nombre: decodedToken.Nombre,
        RolID: decodedToken.RolID,
        picture: decodedToken.Avatar
      });
      setInicio(true);
    }
  }, []);  

  const [clases, setClases] = useState({ menu: "bg-[#1E1E1E] hidden md:hidden", opcion: true })
  const mostrar = () => {
    setClases({
      ...clases,
      menu: "bg-[#1E1E1E] md:hidden",
      opcion: false
    });
  };
  const ocultar = () => {
    setClases({
      ...clases,
      menu: "bg-[#1E1E1E] hidden md:hidden",
      opcion: true
    });
  };
  const salir = () =>{
    localStorage.clear();
    setInicio(false)
  }
  return (
    <>
      <header className="w-full h-[90px] bg-[#1E1E1E] grid grid-cols-3 md:grid-cols-10 justify-center items-center">
        {clases.opcion ? (
          <i className="nf nf-cod-menu md:hidden col-span-1 text-white text-[35px] text-center" onClick={() => mostrar()}></i>
        ) : (
          <i className="nf nf-oct-x md:hidden col-span-1 text-white text-[35px] text-center" onClick={() => ocultar()}></i>
        )}
        <figure className="col-span-1 flex justify-center items-center w-full h-[80px] "><Link to="/" className="bg-[url('/imagenes/logo.png')] bg-cover w-[80px] h-[80px]"></Link> </figure>
        <div className="hidden md:flex md:bg-[#0000] w-[200px] md:h-full md:relative md:col-span-8 items-center">
          <nav className="h-[90px] flex justify-start items-center gap-1">
            <Link to="/" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
            <Link to="/noticias" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
            <Link to="/artistas" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
            <Link to="/nosotros" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
            <Link to="/musica" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
            <Link to="/dashboard" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
            {inicio ? (
              <Link className="h-full text-lg text-white no-underline inline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium whitespace-nowrap" onClick={salir}>Cerrar sesion</Link>
            ) : (
              <></>
            )}
          </nav>
        </div>
        {inicio ? (
          <figure className="flex col-span-1 flex justify-center items-center w-full h-[80px]"><Link to="/usuario"><img className="w-[70px] h-[70px] rounded-full" src={profile.picture} alt="" /></Link></figure>
        ) : (
          <figure className="flex col-span-1 flex justify-center items-center w-full h-[80px]"><Link to="/inicio" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Iniciar Sesion</Link></figure>
        )}
      </header>
      <nav className={clases.menu}>
        <Link to="/" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
        <Link to="/noticias" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
        <Link to="/artistas" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
        <Link to="/nosotros" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
        <Link to="/musica" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
        <Link to="/dashboard" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
        {inicio ? (
          <Link className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium whitespace-nowrap" onClick={salir}>Cerrar sesion</Link>
        ) : (
          <></>
        )}
      </nav>
      <audio controls autoplay>
        <source src="horse.ogg" type="audio/ogg" />
        <source src="horse.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}