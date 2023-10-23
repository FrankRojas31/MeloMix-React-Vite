import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();
    const [clases, setClases] = useState({ menu: "bg-[#1E1E1E] hidden md:hidden", opcion:true})
    const mostrar = () => {
        setClases({
          ...clases,
          menu: "bg-[#1E1E1E] md:hidden",
          opcion:false
        });
      };
      const ocultar = () => {
        setClases({
          ...clases,
          menu: "bg-[#1E1E1E] hidden md:hidden",
          opcion:true
        });
      };
    return (
        <>
            <header className="w-full h-[90px] bg-[#1E1E1E] grid grid-cols-3 md:grid-cols-10 justify-center items-center">
            {clases.opcion ? (
              <i className="nf nf-cod-menu md:hidden col-span-1 text-white text-[35px] text-center" onClick={()=>mostrar()}></i>
            ) : (
                <i className="nf nf-oct-x md:hidden col-span-1 text-white text-[35px] text-center" onClick={()=>ocultar()}></i>
            )}
                <figure className="col-span-1 flex justify-center items-center w-full h-[80px] "><img className="w-[70px] h-[70px] rounded-xl" src="/imagenes/logo.jpg" /></figure>
                <div className="hidden md:flex md:bg-[#0000] w-[200px] md:h-full md:relative md:col-span-8 items-center">
                    <nav className="h-[90px] flex justify-start items-center gap-1">
                        <Link to="/" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
                        <Link to="/noticias" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
                        <Link to="/artistas" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
                        <Link to="/nosotros" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
                        <Link to="/musica" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
                        <Link to="/dashboard" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
                    </nav>
                </div>
                <figure className="flex col-span-1 flex justify-center items-center w-full h-[80px]"><Link to="/usuario"><img className="w-[70px] h-[70px] rounded-full" src="/imagenes/logo.jpg" alt="" /></Link></figure>
            </header>
            <nav className={clases.menu}>
                <Link to="/" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Inicio</Link>
                <Link to="/noticias" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Noticias</Link>
                <Link to="/artistas" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Artistas</Link>
                <Link to="/nosotros" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Nosotros</Link>
                <Link to="/musica" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Musica</Link>
                <Link to="/dashboard" className="h-full text-lg text-white no-underline uppercase flex items-center hover:bg-[#fff3] px-3 py-2 font-medium">Dashboard</Link>
            </nav>
        </>
    );
}