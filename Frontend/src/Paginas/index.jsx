import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Index() {
    const [cancion, setCancion] = useState("");
    const [canciones, setCanciones] = useState([]);

    function handleSearch (){
        e.preventDefault();
        if(cancion.trim()==="") {
            alert("Debes ingresar algo");
            return;
        }
        console.log(cancion)
        setCancion("");
        getSong(cancion)
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53dbda5aa3msha807ea6fbc3e865p15fa9ejsnee948ccef629',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    async function getSong(cancion) {
        try {
            let data = await fetch(url, options);
            let res = await data.json();
            setCanciones(res.tracks.items);
            let url=`https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=10&numberOfTopResults=5;            `
        } catch (error) {
            console.log(`Upsss... ha ocurrido un error: ${error}`);
        }

    }

    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-8">
                <section className="col-span-6 w-full h-full flex flex-wrap justify-center p-[20px]">
                    <h1 className="row-span-1 text-white text-[35px] font-mono text-center">DISFRUTA DE LA MEJOR MUSICA EN ¡MELO MIX!</h1>
                    <p className="row-span-5 text-white mt-10 text-2xl text-justify" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </section>
                <aside className="bg-[#fff5] col-span-2 p-5">
                    <div className="w-full">
                        <span className="flex h-[50px] justify-center w-full">
                            <input type="text" className="h-full p-3 border-none outline-none rounded-l-xl w-full" value={cancion} onChange={e =>  setCancion(e.target.value)}/>
                            <div className="bg-black rounded-xl px-3 h-full flex justify-center items-center -ml-[20px] px-5">
                                <i className="nf nf-fa-search text-white font-medium text-xl"></i>
                                </div>
                        </span>
                    </div>
                    <aside className="w-full p-5 col-span-1">
                        <h5 className="text-white text-[30px] font-medium text-center mb-3">Canciones</h5>
                        {canciones.map((cancion, index) => (
                        <article key={index} className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img src={cancion.imagen} alt={cancion.nombre} className="w-[75px] rounded-xl" />
                            <p className="text-white text-[25px]">{cancion.nombre}</p>
                        </article>
                        ))}
                        <article className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                            <p className="text-white text-[25px]">Titulo de la cancion</p>
                        </article>
                        <article className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                            <p className="text-white text-[25px]">Titulo de la cancion</p>
                        </article>
                        <article className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                            <p className="text-white text-[25px]">Titulo de la cancion</p>
                        </article>
                        <article className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                            <p className="text-white text-[25px]">Titulo de la cancion</p>
                        </article>
                    </aside>
                </aside>
            </main>
            <Footer></Footer>
        </>
    );
}