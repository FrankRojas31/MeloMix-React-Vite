import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Musica(){
    const artistas = Array(10).fill(null);
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const respuesta = await axios.get(
              `http://localhost:3000/canciones`
            );
            setListas(respuesta.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    return(
        <>
            <Header/>
            <main className="w-full min-h-screen bg-[url('/imagenes/musica.jpg')] bg-cover">
                <h2 className="w-full text-white font-medium text-4xl bg-[#000b] p-5 stroke">Top de las canciones:</h2>
                <div className="w-full h-screen bg-[#000b] overflow-scroll py-5">
                    <aside className="w-full py-5 px-5 md:px-10 col-span-1">
                            {listas.map((lista, index) => (
                                <Link to={"/reproductor/"+lista.CancionId}>
                                    <article className="w-full flex border-t-2 py-2 px-5 place-content-between items-center hover:bg-[#fff2]">
                                        <div className="flex gap-5 md:gap-10">
                                            <img src={lista.CancionCaratula} alt="" className="w-[75px] rounded-xl"/>
                                            <div>
                                                <p className="text-white text-[25px]">{lista.CancionNombre}</p>
                                                <Link to={"/artista/"+lista.ArtistaId}>
                                                   <p className="text-white text-[20px]">{lista.ArtistaNombre}</p> 
                                                </Link>
                                            </div>
                                        </div>
                                        
                                        <p className="text-white text-[25px]">{lista.CancionDuracion}</p>
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