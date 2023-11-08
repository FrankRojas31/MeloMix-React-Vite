import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Noticias() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
    const apiKey = "a80a901841fd1d66120c1296f6c85121";
    const location = "Mexico City, MX"; 
    fetch(`http://ws.audioscrobbler.com/2.0/?method=geo.getevents&location=${location}&api_key=${apiKey}&format=json`)
        .then((response) => response.json())
        .then((data) => {
        if (data.events && data.events.event) {
            setEventos(data.events.event);
        }
    })
        .catch((error) => {
        console.error("Error al obtener eventos:", error);
        });
}, []);

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
                        Eventos Musicales mas recientes
                    </h2>

                    <div className="h-[600px] overflow-scroll">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5">
                        {eventos.map((evento, index) => (
                                <article className="flex flex-wrap items-center justify-center w-full h-[200px] bg-black rounded-xl">
                                    <img className="w-[125px] h-[125px] rounded-[40px]" src="/imagenes/logo.jpg" alt="" />
                                    <h3 className="w-full text-white text-xl text-center">{evento.tittle}</h3>
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