import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Player from '@madzadev/audio-player'
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import "../css/Inicio.css"
export default function Index() {

  const [tracks, setTracks] = useState([]);
  const colors = `html {
    --tagsBackground: #9440f3;
    --tagsText: #ffffff;
    --tagsBackgroundHoverActive: #2cc0a0;
    --tagsTextHoverActive: #ffffff;
    --searchBackground: #18191f;
    --searchText: #ffffff;
    --searchPlaceHolder: #575a77;
    --playerBackground: #1E1E1E;
    --titleColor: #ffffff; 
    --timeColor: #ffffff;
    --progressSlider: #fff;
    --progressUsed: #ffffff;
    --progressLeft: #151616;
    --volumeSlider: #fff;
    --volumeUsed: #ffffff;
    --volumeLeft:  #151616;
    --playlistBackground: #1E1E1E;
    --playlistText: #fff;
    --playlistBackgroundHoverActive:  #18191f;
    --playlistTextHoverActive: #575a77;
}`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/cancionesR`
        );
        const datosMapeados = respuesta.data.map(item => ({
          url: item.CancionDireccion,
          title: `${item.CancionNombre} - ${item.ArtistaNombre}`,
          tags: ['house'] // Puedes personalizar las etiquetas según tus necesidades
        }));
        setTracks(datosMapeados);
        
        console.log(respuesta.data);
        var element = document.querySelector("._RZMQZ");
        element.classList.add("overflow-hidden");
        var contenedorDestino = document.getElementById('canciones');
        contenedorDestino.appendChild(element);
        var element2 = document.querySelector("._1PreE");
        var contenedorDestino2 = document.getElementById('busqueda');
        contenedorDestino2.appendChild(element2);
        element2.classList.add("clase");
        element2.setAttribute('placeholder', 'Buscar Canciones');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    esperarCincoSegundos(() => {
      var element = document.querySelector("._RZMQZ");
      var contenedorDestino = document.getElementById('canciones');
      contenedorDestino.appendChild(element);
      var element2 = document.querySelector("._1PreE");
      var contenedorDestino2 = document.getElementById('busqueda');
      contenedorDestino2.appendChild(element2);
      element2.classList.add("clase");
      element2.setAttribute('placeholder', 'Buscar Canciones');
    });
  }, []);
  function esperarCincoSegundos(callback) {
    setTimeout(callback, 500);
  }
  return (
    <>
      <Header></Header>
      <div className='p-5'>
        {tracks.length > 0 && (
          <Player
            trackList={tracks}
            includeTags={false}
            includeSearch={true}
            showPlaylist={true}
            autoPlayNextTrack={true}
            customColorScheme={colors}
          />
        )}
      </div>
      <div className="w-screen h-screen bg-[url('/imagenes/index.jpg')] bg-cover flex justify-center items-center">
        <div className="banner p-7">
          <h1 className="h1 stroke">MELOMIX</h1>
          <p className="p stroke">*¡La mejor música, ahora a tu alcance!</p>
        </div>
      </div>
      <main className="w-full min-h-screen bg-gradient-to-r from-gray-900 to-blue-950 grid grid-cols-1 lg:grid-cols-8">
        <section className="col-span-6 w-full h-full flex flex-wrap justify-center p-[20px]">
        <em>
          <h1 className="row-span-1 text-white text-[30px] font-serif text-center stroke">DISFRUTA DE LA MEJOR MUSICA EN ¡MELOMIX!</h1>      
          </em>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-end">
              <div className="w-full flex justify-center md:justify-end items-center">
                <img src="/imagenes/musica.jpeg" alt="imagen" className="object-cover rounded-full relative h-48 w-48 bg-clip-padding p-3 bg-white-100 border-4 border-grey-100  border-dashed" />
              </div>
              <p className="col-span-2 w-full h-full text-white mt-10 text-2xl text-justify text-lg font-semibold px-10" >
                <em> Melomix es mucho más que una simple aplicación de música, es tu compañero musical personal. </em>En un viaje apasionante a través del increíble mundo de los sonidos y ritmos. 
                Creemos que la música es una forma de expresión universal que puede inspirar, consolar y enriquecer nuestras vidas de formas innumerables.
              </p>           
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-end">
              <div className="w-full flex md:hidden justify-center md:justify-end items-center">
                <img src="/imagenes/musica2.jpeg" alt="imagen" className="object-cover rounded-full relative h-48 w-48 bg-clip-padding p-3 bg-white-100 border-4 border-grey-100  border-dashed" />  
              </div> 
              <p className="col-span-2 w-full h-full text-white mt-10 text-2xl text-justify text-lg font-semibold px-10" >
              Desde las canciones más icónicas hasta los artistas más innovadores, es tu boleto para explorar una vasta y diversa biblioteca musical
              Ya sea que desees revivir viejos recuerdos con canciones clásicas o descubrir las últimas tendencias musicales. <em> Nuestra aplicación te brinda acceso a un catálogo 
              en constante crecimiento</em> que satisface todos tus gustos y preferencias.
              </p>
              <div className="hidden w-full md:flex justify-center md:justify-start items-center">
                <img src="/imagenes/musica2.jpeg" alt="imagen" className="object-cover rounded-full relative h-48 w-48 bg-clip-padding p-3 bg-white-100 border-4 border-grey-100  border-dashed" />  
              </div>           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-end">
              <div className="w-full flex justify-center md:justify-end items-center">
                <img src="/imagenes/musica3.jpeg" alt="imagen" className="object-cover rounded-full relative h-48 w-48 bg-clip-padding p-3 bg-white-100 border-4 border-grey-100  border-dashed" />
              </div>
              <p className="col-span-2 w-full h-full text-white mt-10 text-2xl text-justify text-lg font-semibold px-10" >
              Melo Mix se enorgullece de ser tu puerta de entrada al mundo musical. Es el lugar donde puedes perderse en la música y, al mismo tiempo, encontrarte a ti mismo. 
              Es el compañero que siempre está ahí para elevar tu espíritu. <em>Te acompaña en tus momentos felices y te brinda consuelo en los momentos difíciles</em>
              </p>           
          </div>
        </section>

        <aside className="bg-[#fff5] col-span-2 p-5">
          <div className="w-full">
            <span className="flex h-[50px] justify-center w-full" >
              <div className="h-full border-none outline-none rounded-l-xl w-full" id="busqueda"></div>
              <div className="bg-black rounded-xl px-3 h-full flex justify-center items-center -ml-[20px] px-5">
                <i className="nf nf-fa-search text-white font-medium text-xl"></i>
              </div>
            </span>
          </div>
          <h5 className="text-white text-[30px] font-medium text-center  stroke">Canciones Populares</h5>
          <aside className="w-full overflow-auto h-[500px]" id="canciones">
            
          </aside>
        </aside>

      </main>
      <Footer />
    </>
  );
}