import React, { useContext, useEffect, useState } from "react";
import "../css/dashboard.css";
import { useNavigate } from "react-router-dom";
import Dashboards from "../componentes/Dashboards";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Index from ".";
import InicioSesion from "../componentes/InicioSesion";
import Registro from "../componentes/Registro";
import Vusuarios from "../componentes/Vusuarios";

function Dashboard() {
  const navigate = useNavigate();
  const [clases, setClases] = useState({ menu: "db-mostrar bg-sidebar w-[250px] h-screen" })

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
  };
  return (
    <>
      <main className="w-full h-full min-h-screen flex">
        <aside className={clases.menu}>
          <div className="w-full h-full flex flex-wrap content-start">
            <figure className="flex flex-wrap h-[100px] p-6">
              <a href="index.html" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
            </figure>
            <div className="relative w-full flex flex-wrap content-start">
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<Dashboards />)}>
                <i className="nf nf-md-home_account text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Dashboard </p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<Vusuarios />)}>
                <i className="nf nf-oct-person text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white"> Usuarios</p>
                <div className="db-triangleleft"></div>
              </span>
              <span className="w-full pl-5 py-3 flex items-center cursor-pointer hover:bg-[#fff2]" onClick={() => components(<Registro />)}>
                <i className="nf nf-md-account_arrow_up text-white inline text-[25px] pointer"></i>
                <p className="inline uppercase ml-[10px] text-[20px] text-white">Agregar</p>
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
                <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
              </div>
            </div>
          </header>
          <div className="flex w-full justify-center h-5/6 overflow-y-auto">{componentes}</div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;