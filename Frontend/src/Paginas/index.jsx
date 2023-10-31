import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Index() {
    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-8">
                <aside className="w-full h-[200px] lg:h-full col-span-2 bg-[url('/imagenes/acdc.jpeg')] bg-cover relative">
                    <span className="w-full flex justify-center absolute bottom-[10%]">
                    <i className="nf nf-cod-chevron_left text-white font-medium text-4xl mr-5"></i>
                    <i className="nf nf-md-pause text-white font-medium text-4xl"></i>
                    <i className="nf nf-cod-chevron_right text-white font-medium text-4xl ml-5"></i>
                    </span>
                </aside>
                <section className="col-span-4 w-full h-full flex flex-wrap justify-center p-[20px]">
                    <h1 className="row-span-1 text-white text-[35px] font-mono text-center">DISFRUTA DE LA MEJOR MUSICA EN ¡MELO MIX!</h1>
                    <p className="row-span-5 text-white mt-10 text-2xl text-justify" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </section>
                <aside className="bg-[#fff5] col-span-2 p-5">
                    <div className="w-full">
                        <span className="flex h-[50px] justify-center w-full">
                            <input type="text" className="h-full p-3 border-none outline-none rounded-l-xl w-full"/>
                            <div className="bg-black rounded-xl px-3 h-full flex justify-center items-center -ml-[20px] px-5"><i className="nf nf-fa-search text-white font-medium text-xl"></i></div>
                        </span>
                    </div>
                    <aside className="w-full p-5 col-span-1">
                        <h5 className="text-white text-[30px] font-medium text-center mb-3">Canciones</h5>
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