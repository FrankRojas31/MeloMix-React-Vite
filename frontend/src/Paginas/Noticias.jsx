import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Noticias() {
    const artistas = Array(10).fill(null);
    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <main className="w-full min-h-screen bg-white grid grid-cols-1 lg:grid-cols-10">
                <div className="col-span-7 p-5 lg:p-10 w-full h-full">
                    <section className="bg-[#000] w-full h-full p-10 rounded-[40px]">
                        <h1 className="w-full text-center text-white font-medium text-4xl mb-10">Titulo</h1>
                        <p className="w-full text-justify text-white text-xl text-[25px]">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia repellendus impedit tempora quos voluptate voluptatem cum odit vero quasi ipsum, nobis consectetur accusamus dolorem. Architecto debitis corporis rerum inventore obcaecati.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fugiat culpa quos illum suscipit obcaecati. Fuga, praesentium debitis! Sunt iusto quia voluptatum excepturi aperiam. Minus nam beatae magnam officiis perferendis!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi officia delectus vero eius accusantium vel mollitia iusto soluta non repellendus sint vitae aliquam voluptas, voluptates quis impedit incidunt, illo eveniet?
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, recusandae eos! Inventore laudantium aliquid expedita tempore modi porro repellendus, officiis nulla nemo molestias nam, incidunt temporibus optio iste, beatae ut!
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor culpa ipsa ipsum quos quis saepe est cum id unde, vitae deleniti quasi fuga autem exercitationem consequatur, impedit quam dignissimos eius.
                        </p>
                    </section>
                </div>

                <aside className="col-span-3 flex flex-col p-5">
                    <h2 className="nt-titulo2 my-5 w-full text-center font-bold text-xl">
                        Noticias mas recientes
                    </h2>

                    <div className="h-[600px] overflow-scroll">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5">
                        {artistas.map((_, index) => (
                                <article className="flex flex-wrap items-center justify-center w-full h-[200px] bg-black rounded-xl">
                                    <img className="w-[125px] h-[125px] rounded-[40px]" src="/imagenes/logo.jpg" alt="" />
                                    <h3 className="w-full text-white text-xl text-center">Subtitulo</h3>
                                </article>
                        ))}
                        </div>
                    </div>
                </aside>
            </main>
            <Footer></Footer>
        </>
    );
}