import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect,  useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

export default function Artista(){
    const artistas = Array(5).fill(null);
    const [canciones, setCanciones] = useState([]);
    const { id } = useParams();
    const [biografia, setBiografia] = useState("");
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const respuesta = await axios.get(
              `http://localhost:3000/Artistas/${id}`
            );
            setListas(respuesta.data[0]);
    
            // Extraer el nombre para la búsqueda de Wikipedia
            const nombre = respuesta.data[0].Biografia;
            console.log(nombre);
    
            const bioRespuesta = await axios.get(
              `http://localhost:3000/biografia/${nombre}`
            );
            const numerosFiltrados = filtrarNumerosEntreCorchetes(bioRespuesta.data);

            // Actualizar el estado con la biografía filtrada
            setBiografia(DOMPurify.sanitize(bioRespuesta.data));
            console.log(numerosFiltrados);

            const respuesta2 = await axios.get(
                `http://localhost:3000/cancionesA/${respuesta.data[0].Id}`
              );
              setCanciones(respuesta2.data); 
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [id]);
      const filtrarNumerosEntreCorchetes = (texto) => {
        const expresionRegular = /\[(\d+)\]/g;
        const coincidencias = texto.match(expresionRegular);
        const numerosFiltrados = coincidencias ? coincidencias.map(match => parseInt(match[1], 10)) : [];
    
        return numerosFiltrados;
      };
    return(
        <>
            <Header/>
            <main className="w-full min-h-screen">
                <div className={"w-full h-[400px] inset-0 bg-cover bg-center relative"}>
                    <img src={listas.Foto} alt="" className="w-full h-full absolute object-cover"/>
                    <span className="absolute bottom-10 left-10 flex items-center">
                        <i className="nf nf-oct-play text-white text-[50px] font-medium mr-3 stroke"></i>
                        <h1 className="text-white text-[50px] font-medium stroke">{listas.Nombre}</h1>
                    </span>
                </div>
                <div className="w-full p-5 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <section className="bg-[#262626bb] col-span-2 py-5 px-10 rounded-xl ">
                            <h4 className="text-white text-[30px] font-medium">{listas.Nombre}:</h4>
                            <div
                                className="text-white text-[20px] text-justify max-h-[500px] overflow-scroll"
                                dangerouslySetInnerHTML={{ __html: biografia }}
                                />
                    </section>
                    <aside className="w-full p-5 col-span-1">
                        <h5 className="text-white text-[30px] font-medium text-center mb-3 stroke">Canciones</h5>
                        {canciones.map((can, index) => (
                            <Link to={"/reproductor/"+can.CancionId}>
                                <article className="w-full flex gap-5 border-t-2 p-2 items-center hover:bg-[#fff2] cursor-pointer">
                                    <img src={can.CancionCaratula} alt="" className="w-[75px] rounded-xl"/>
                                    <p className="text-white text-[25px]">{can.CancionNombre}</p>
                                </article>
                            </Link>
                        ))}
                    </aside>
                </div>
            </main>    
            <Footer/>    
        </>
    );
}