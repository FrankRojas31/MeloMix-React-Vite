import React, { useContext, useEffect, useState } from "react";
import "../css/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Dashboards from "../componentes/Dashboards";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Index from ".";
import Vusuarios from "../componentes/Vusuarios";
import VAdmin from "../componentes/VAdmin";
import VArtistas from "../componentes/VArtistas";
import VCanciones from "../componentes/VCanciones";
import * as jwtDecode from 'jwt-decode'; 

function Dashboard() {
  const navigate = useNavigate();
  const [clases, setClases] = useState({ menu: "db-mostrar bg-sidebar w-[250px] h-screen" });
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
      setInicio(true);
    }
  }, []);  

  const components = (componente) => {
    setComponentes(componente);
    ocultar();
  };
  const [componentes, setComponentes] = useState(
    <Dashboards components={components} />
  );
  const mostrar = () => {
    setClases({
      ...clases,
      menu: "db-mostrar bg-sidebar w-[250px] h-screen",
    });
  };
  const ocultar = () => {
    setClases({
      ...clases,
      menu: "db-ocultar bg-sidebar w-[250px] h-screen",
    });
  }
  
  const avatarImage = profile.Avatar;
  const Message = `Hola, ${profile.Nombre}`;

  return (
    <>
      <main className="w-full h-full min-h-screen flex">
      <aside className={clases.menu}>
          <div className="w-full h-full flex flex-wrap content-start">
            <figure className="flex flex-wrap h-[100px] p-6">
              <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</Link>
            </figure>
            <div className="relative w-full flex flex-wrap content-start">
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<Dashboards components={components}/>)}>
                <i className="nf nf-md-home_account text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Dashboard </p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<Vusuarios components={components} />)}>
                <i className="nf nf-oct-person text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Usuarios</p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<VAdmin components={components} />)}>
                <i className="nf nf-oct-person_add text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Admins</p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<VArtistas components={components} />)}>
                <i className="nf nf-md-account_music text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Artistas</p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<VCanciones components={components} />)}>
                <i className="nf nf-md-music_circle text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Canciones</p>
                <div className="db-triangleleft"></div>
              </span>
            </div>
          </div>
        </aside>
        <i className="nf nf-cod-menu" id="mostrar" onClick={mostrar}></i>
        <section className="flex flex-wrap relative w-full overflow-x-auto h-screen bg-[#F3F4F6]" onClick={ocultar}>
          <header className="w-full h-[75px] items-center bg-white py-2 px-6 flex">
            <div className="relative w-1/2 flex justify-start"></div>
            <div className="relative w-1/2 flex justify-end">
              <div className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400">
                <img src={avatarImage} alt="User Avatar" />
              </div>
              <span className="text-lg ml-3 text-gray-800 flex items-center">{Message}</span>
            </div>
          </header>
          <div className="flex w-full justify-center h-5/6 overflow-y-auto">{componentes}</div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;