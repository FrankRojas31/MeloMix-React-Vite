import React, { useState, useEffect } from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Editar from "../componentes/Editar";
import Favoritas from "../componentes/Favoritas";
import Historial from "../componentes/Historial";

export default function PUsuarios() {
  const [profile, setProfile] = useState([]);
  const [componentes, setComponentes] = useState(<Favoritas />);

  useEffect(() => {
    const autenticado = localStorage.getItem("token");

    if (autenticado) {
      try {
        const tokencitoSuculento = autenticado.split('.');
        const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
        setProfile(decodi64);
      } catch (error){
        console.log("valgo keso JAJAJA")
      }
    }
  }, []);

  const components = (componente) => {
    setComponentes(componente);
  };

  const Message = `Bienvenido, ${profile.Nombre}`;
  const Image = profile.Avatar;
  
  return (
    <>
      <Header></Header>
      <main className="bg-[url('/imagenes/disco.png')] inset-0 bg-cover bg-center w-full min-h-screen p-10 grid md:grid-cols-6 md:grid-rows-3 gap-5">
        <div className="row-span-1 col-span-6 rounded-xl bg-[#000] grid grid-cols-4 shadow-2xl">
          <span className="col-span-6 sm:col-span-1 p-3 flex items-center justify-center">
            <img src={Image} className="w-[150px] rounded-full" alt="" />
          </span>
          <span className="col-span-6 mb-5 sm:mb-0 sm:col-span-3 flex items-center justify-center">
            <h2 className="text-white text-center text-[30px] md:text-[45px] font-bold">{Message}</h2>
          </span>
        </div>
        <aside className="row-span-1 col-span-6 md:row-span-2 md:col-span-1 rounded-xl bg-[#000] grid grid-rows-1 md:grid-rows-3 grid-cols-3 md:grid-cols-1 shadow-2xl">
          <p className="text-white text-[25px] font-bold flex items-center justify-center hover:bg-[#fff1] rounded-l-xl md:rounded-t-xl hover:cursor-pointer" onClick={() => components(<Favoritas />)}>Favoritas</p>
          <p className="text-white text-[25px] font-bold flex items-center justify-center hover:bg-[#fff1] hover:cursor-pointer" onClick={() => components(<Historial />)}>Historial</p>
          <p className="text-white text-[25px] font-bold flex items-center justify-center hover:bg-[#fff1] rounded-r-xl md:rounded-b-xl hover:cursor-pointer" onClick={() => components(<Editar />)}>Editar</p>
        </aside>
        <section className="row-span-1 col-span-6 md:row-span-2 md:col-span-5 rounded-xl max-h-[400px]">
          {componentes}
        </section>
      </main>
      <Footer></Footer>
    </>
  );
}
