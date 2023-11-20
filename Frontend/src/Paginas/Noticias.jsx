import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import axios from "axios";
import { format } from 'date-fns';
export default function Noticias() {
    const [listas, setListas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/music`
                );
                setListas(respuesta.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <main className="w-full min-h-screen bg-gray-200 font-sans p-5">
                <h1 className="w-full text-4xl font-bold mb-5 ">Ultimas noticias:</h1>
                <section className="w-full-screen h-full flex flex-wrap justify-center gap-10">
                    {listas.map((lista, index) => {
                        const fechaOriginal = lista.date;
                        const fechaFormateada = format(new Date(fechaOriginal), "dd 'de' MMMM 'de' yyyy");
                        return (<div class="w-[400px] h-[300px] bg-white shadow-xl rounded-lg overflow-hidden flex flex-wrap p-5 justify-center items-center agrandar">
                            <h2 class="w-full text-center text-2xl font-bold">{lista.title}</h2>
                            <p class="w-full text-justify text-gray-700 text-base">{lista.abstract}</p>
                            <span class="w-full text-right text-gray-600">{fechaFormateada}</span>
                            <a href={lista.url} class="bg-blue-500 text-white rounded-md text-center px-2 py-1 hover:bg-blue-700">Leer más</a>
                        </div>);
                    })}
                </section>

            </main>
            <Footer></Footer>
        </>
    );
}