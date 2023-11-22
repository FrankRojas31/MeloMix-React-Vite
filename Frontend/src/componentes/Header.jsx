import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [inicio, setInicio] = useState(false);

  useEffect(() => {
    const autenticado= localStorage.getItem("token");
    if (autenticado) {
      try {
        const tokencitoSuculento = autenticado.split('.');
        const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
        setProfile(decodi64);
        setInicio(true);
      } catch (error){
        console.log("valgo keso JAJAJA")
      }
    }
  }, []);  

  const RolID = profile.Rol;
  const [clases, setClases] = useState({ menu: "bg-[#1E1E1E] hidden lg:hidden", opcion: true })
  const mostrar = () => {
    setClases({
      ...clases,
      menu: "bg-[#1E1E1E] lg:hidden",
      opcion: false
    });
  };
  const ocultar = () => {
    setClases({
      ...clases,
      menu: "bg-[#1E1E1E] hidden lg:hidden",
      opcion: true
    });
  };
  const salir = () =>{
    localStorage.clear();
    window.location.reload();
    setInicio(false)
  }
  return (
    <>
      <header className="w-full h-[90px] bg-[#1E1E1E] grid grid-cols-3 lg:grid-cols-10 justify-center items-center">
        {clases.opcion ? (
          <i className="nf nf-cod-menu lg:hidden col-span-1 text-white text-[35px] text-center cursor-pointer" onClick={() => mostrar()}></i>
        ) : (
          <i className="nf nf-oct-x lg:hidden col-span-1 text-white text-[35px] text-center cursor-pointer" onClick={() => ocultar()}></i>
        )}
        <figure className="col-span-1 flex justify-center items-center w-full h-[80px] "><Link to="/" className="bg-[url('/imagenes/logo.png')] bg-cover w-[80px] h-[80px]"></Link> </figure>
        <div className="hidden lg:flex md:bg-[#0000] w-[200px] md:h-full md:relative md:col-span-8 items-center">
          <nav className="h-[90px] flex justify-start items-center gap-1">
            <Link to="/" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
            <Link to="/noticias" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
            <Link to="/artistas" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
            <Link to="/nosotros" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
            <Link to="/musica" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
            <Link to="/spotify" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Spotify</Link>
            {inicio && RolID === 1 ? (
              <Link to="/dashboard" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
            ) : (
              <></>
            )}
            {inicio ? (
              <Link to="/" className="h-[90px] text-lg text-white no-underline inline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium whitespace-nowrap" onClick={salir}>Cerrar sesion</Link>
            ) : (
              <></>
            )}
          </nav>
        </div>
        {inicio ? (
          <figure className="flex col-span-1 flex justify-center items-center w-full h-[80px]"><Link to="/usuario"><img className="w-[70px] h-[70px] rounded-full" src={profile.Avatar} alt="" /></Link></figure>
        ) : (
          <figure className="flex col-span-1 flex justify-center items-center w-full h-[80px]"><Link to="/inicio" className="h-full text-lg text-white text-center no-underline uppercase flex items-center hover:underline px-3 py-2 font-medium">Iniciar Sesion</Link></figure>
        )}
      </header>
      <nav className={clases.menu}>
        <Link to="/" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
        <Link to="/noticias" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
        <Link to="/artistas" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
        <Link to="/nosotros" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
        <Link to="/musica" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
        <Link to="/dashboard" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
        <Link to="/spotify" className="h-[90px] text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Spotify</Link>
        {inicio ? (
          <Link className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium whitespace-nowrap" onClick={salir}>Cerrar sesion</Link>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}