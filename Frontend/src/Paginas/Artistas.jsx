import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

export default function Artistas(){
    const artistas = Array(20).fill(null);
    return(
        <>
            <Header/>
            <main className="w-full min-h-screen bg-[url('/imagenes/artistas.jpg')] bg-cover">
                <h2 className="w-full text-white font-medium text-4xl bg-[#6669] p-5">Top de los artistas:</h2>
                <div className="w-full min-h-screen p-5 lg:p-20 flex justify-center items-center bg-[#fff6]">
                <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-h-screen overflow-scroll gap-3 place-items-center">
                {artistas.map((_, index) => (
                    <article
                        className="w-[225px] aspect-[4/3] p-[20px] bg-[#000a] rounded-[40px] flex flex-wrap justify-center"
                    >
                        <img
                        className="w-[150px] h-[150px] rounded-[40px]"
                        src="/imagenes/logo.jpg"
                        alt=""
                        />
                        <p className="w-full text-center text-white font-medium text-xl">
                        Artista
                        </p>
                    </article>
                ))}
                </section>
                </div>
                
            </main>
            <Footer/>  
        </>
    );
}