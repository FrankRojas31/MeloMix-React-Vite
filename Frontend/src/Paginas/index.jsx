import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import "../css/Inicio.css"
import AudioPlayer from "../componentes/audioplayer";
export default function Index() {
    const [cancionesPopulares, setCancionesPopulares] = useState([]);

  async function getTopTracks() {
    try {
      const apiKey = "a80a901841fd1d66120c1296f6c85121";
      const url = `http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${apiKey}&format=json&limit=6`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.tracks && data.tracks.track) {
        const tracks = data.tracks.track;
        setCancionesPopulares(tracks);
      } else {
        console.error("No se encontraron canciones populares");
      }
    } catch (error) {
      console.error(`Error al obtener canciones populares: ${error}`);
    }
  }

  useEffect(() => {
    getTopTracks();
  }, []);

    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <AudioPlayer></AudioPlayer>
            <div className="w-screen h-screen bg-[url('/imagenes/index.jpg')] bg-cover flex justify-center items-center">
                <div className="banner">
                <h1 className="h1">MELOMIX</h1>
                <p className="p">*¡La mejor música, ahora a tu alcance!</p>
                </div>
            </div>
            <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-8">
                <section className="col-span-6 w-full h-full flex flex-wrap justify-center p-[20px]">
                    <h1 className="row-span-1 text-white text-[35px] font-mono text-center">DISFRUTA DE LA MEJOR MUSICA EN ¡MELO MIX!</h1>
                    <p className="row-span-5 text-white mt-10 text-2xl text-justify" >
                    Melo Mix es mucho más que una simple aplicación de música; es tu compañero musical personal en un viaje apasionante a través del increíble mundo de los sonidos y ritmos. Creemos que la música es una forma de expresión universal que puede inspirar, consolar y enriquecer nuestras vidas de formas innumerables. Es por eso que hemos diseñado Melo Mix con el objetivo de brindarte una experiencia musical excepcional que va más allá de simplemente reproducir canciones.
                    Desde las canciones más icónicas hasta los artistas más innovadores, Melo Mix es tu boleto para explorar una vasta y diversa biblioteca musical. Ya sea que desees revivir viejos recuerdos con canciones clásicas o descubrir las últimas tendencias musicales, nuestra aplicación te brinda acceso a un catálogo en constante crecimiento que satisface todos tus gustos y preferencias.
                    Melo Mix se enorgullece de ser tu puerta de entrada al mundo musical. Es el lugar donde puedes perderse en la música y, al mismo tiempo, encontrarte a ti mismo. Es el compañero que siempre está ahí para elevar tu espíritu, te acompaña en tus momentos felices y te brinda consuelo en los momentos difíciles.
                    
                    </p>
                </section>
                <aside className="bg-[#fff5] col-span-2 p-5">
                    <div className="w-full">
                        <span className="flex h-[50px] justify-center w-full">
                            <input type="text" className="h-full p-3 border-none outline-none rounded-l-xl w-full"/>
                            <div className="bg-black rounded-xl px-3 h-full flex justify-center items-center -ml-[20px] px-5">
                                <i className="nf nf-fa-search text-white font-medium text-xl"></i>
                                </div>
                        </span>
                    </div>
                    <h5 className="text-white text-[30px] font-medium text-center mb-3">Canciones Populares</h5>
                    <aside className="w-full p-5 col-span-1 overflow-scroll h-[500px]">
                    {cancionesPopulares.map((cancion, index) => (
                        <article key={index} className="w-full flex gap-5 border-t-2 py-2 items-center">
                            <img
                                src={cancion.image[1]['#text']}
                                alt={cancion.name}
                                className="w-[75px] rounded-xl"
                            />
                            <p className="text-white text-[25px]">{cancion.name}</p>
                        </article>
                    ))}
                </aside>
            </aside>
        </main>
        <Footer/>
        </>
    );
}