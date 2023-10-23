import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Nosotros(){
    return(
        <>
            <Header/>
            <main className="bg-[url('/imagenes/nosotros.jpg')] w-full bg-cover">
                <section className="w-full min-h-screen bg-[#000b] p-[20px] lg:p-20">
                    <h1 className="text-white text-[35px] sm:text-[45px] lg:text-[65px] font-mono">MeloMix S.A DE C.V</h1>
                    <p className="text-white text-[25px] sm:text-[30px] lg:text-[40px] mt-5 text-justify" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </section>
            </main>
            <Footer/>
        </>
    );
}