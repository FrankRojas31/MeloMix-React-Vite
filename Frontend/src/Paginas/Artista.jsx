import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Artista(){
    const artistas = Array(5).fill(null);
    const { id } = useParams();
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/Artistas/${id}`
                );
                setListas(respuesta.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return(
        <>
            <Header/>
            <main className="w-full min-h-screen">
                <div className={"w-full h-[400px] bg-[url('"+listas.Foto+"')] inset-0 bg-cover bg-center relative"}>
                    <span className="absolute bottom-10 left-10 flex items-center">
                        <i className="nf nf-oct-play text-white text-[50px] font-medium mr-3"></i>
                        <h1 className="text-white text-[50px] font-medium">{listas.Nombre}</h1>
                    </span>
                </div>
                <div className="w-full p-5 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <section className="bg-[#262626bb] col-span-2 py-5 px-10 rounded-xl">
                            <h4 className="text-white text-[30px] font-medium">Aurora:</h4>
                            <p className="text-white text-[20px] text-justify">
                            Aurora Aksnes (Stavanger; 15 de junio de 1996), conocida simplemente como AURORA, es una cantautora noruega. Inició su carrera en 2012 con una serie de sencillos independientes que sirvieron para desarrollar su propuesta artística.1​2​ Adquirió notoriedad con el extended play Running with the Wolves —publicado por Decca Records en mayo de 2015—3​ y su versión del tema «Half the World Away» para un comercial navideño de la marca John Lewis.4​5​ Su debut en el formato de larga duración ocurrió con All My Demons Greeting Me as a Friend (2016), que comprende una serie de doce temas producidos con los noruegos Odd Martin Skålnes y Magnus Åserud Skylstad.6​ Continuó su evolución musical con Infections of a Different Kind (Step 1) (2018) y A Different Kind of Human (Step 2) (2019), los cuales constituyen una obra de dos partes que abordan un mismo «proceso emocional», según la cantante.7​ En estos últimos tres trabajos, Aksnes exploró temas como el escapismo, la introspección, el impacto ambiental y el empoderamiento.8​9​10​ Mediante temas como «Queendom» (que habla sobre crear unidad entre los desvalidos),10​ la artista ha creado una amplia base de fanáticos, quienes a su vez acuñaron la etiqueta colectiva «warriors and weirdos» («guerreros y raros»).11​ Su álbum más reciente, The Gods We Can Touch (2022), utiliza a los dioses de la mitología griega para hablar sobre «la vergüenza, el deseo y la moralidad».    
                            </p>
                    </section>
                    <aside className="w-full p-5 col-span-1">
                        <h5 className="text-white text-[30px] font-medium text-center mb-3">Canciones</h5>
                        {artistas.map((_, index) => (
                            <article className="w-full flex gap-5 border-t-2 py-2 items-center">
                                <img src="/imagenes/logo.jpg" alt="" className="w-[75px] rounded-xl"/>
                                <p className="text-white text-[25px]">Titulo de la cancion</p>
                            </article>
                        ))}
                    </aside>
                </div>
            </main>    
            <Footer/>    
        </>
    );
}