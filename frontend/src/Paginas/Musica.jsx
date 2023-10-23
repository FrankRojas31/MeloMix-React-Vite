import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

export default function Musica(){
    const artistas = Array(10).fill(null);
    return(
        <>
            <Header/>
            <main className="w-full min-h-screen bg-[url('/imagenes/musica.jpg')] bg-cover">
                <h2 className="w-full text-white font-medium text-4xl bg-[#000b] p-5">Top de las canciones:</h2>
                <div className="w-full h-screen bg-[#000b] overflow-scroll py-5">
                    <aside className="w-full py-5 px-5 md:px-10 col-span-1">
                            {artistas.map((_, index) => (
                                <article className="w-full flex border-t-2 py-2 px-5 place-content-between items-center">
                                    <div className="flex gap-5 md:gap-10">
                                        <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                                        <div>
                                            <p className="text-white text-[25px]">Titulo de la cancion</p>
                                            <p className="text-white text-[20px]">Artista</p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-white text-[25px]">00:00</p>
                                </article>
                            ))}
                    </aside>
                </div>
            </main>
            <Footer/>  
        </>
    );
}