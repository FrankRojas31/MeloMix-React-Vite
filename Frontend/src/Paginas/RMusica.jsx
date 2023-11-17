import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Player from '@madzadev/audio-player'

export default function RMusica() {
    const [listas, setListas] = useState([]);
    const { id } = useParams();
    const [videoid, setVideoid] = useState("");
    const [letra, setLetra] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [isHearted, setIsHearted] = useState(false);

    const toggleHeart = () => {
        setIsHearted(!isHearted);
    };

    const colors = `html {
        --tagsBackground: #9440f3;
        --tagsText: #ffffff;
        --tagsBackgroundHoverActive: #2cc0a0;
        --tagsTextHoverActive: #ffffff;
        --searchBackground: #18191f;
        --searchText: #ffffff;
        --searchPlaceHolder: #575a77;
        --playerBackground: #0000;
        --titleColor: #ffffff; 
        --timeColor: #ffffff;
        --progressSlider: #fff;
        --progressUsed: #ffffff;
        --progressLeft: #fff5;
        --volumeSlider: #fff;
        --volumeUsed: #ffffff;
        --volumeLeft:  #fff5;
        --playlistBackground: #000;
        --playlistText: #575a77;
        --playlistBackgroundHoverActive:  #18191f;
        --playlistTextHoverActive: #ffffff;
    }`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/canciones/${id}`
                );
                console.log(respuesta.data[0].CancionDireccion)

                setTracks([
                    {
                        url: respuesta.data[0].CancionDireccion,
                        title: `${respuesta.data[0].CancionNombre} - ${respuesta.data[0].ArtistaNombre}`,
                        tags: ['house']
                    },
                    {
                        url: respuesta.data[0].CancionDireccion,
                        title: `${respuesta.data[0].CancionNombre} - ${respuesta.data[0].ArtistaNombre}`,
                        tags: ['house']
                    },
                ]);
                esperarCincoSegundos(() => {
                    var element = document.querySelector("._RZMQZ");
                    if (element) {
                        element.classList.add("hidden");
                    }
                  });

                setListas(respuesta.data[0]);

                esperarCincoSegundos(() => {
                    var element = document.querySelector("._RZMQZ");
                    if (element) {
                        element.classList.add("hidden");
                    }
                  });

                console.log(respuesta.data[0].CancionVideo);
                const respuesta2 = await axios.get(
                    `http://localhost:3000/youtube/${respuesta.data[0].CancionVideo}`
                );
                setVideoid(respuesta2.data[0].id.videoId);
                const respuesta3 = await axios.get(
                    `http://localhost:3000/letras/${respuesta.data[0].ArtistaNombre}/${respuesta.data[0].CancionNombre}`
                );
                setLetra(respuesta3.data.split('\n'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    function esperarCincoSegundos(callback) {
        setTimeout(callback, 100);
    }

    return (
        <>
            <Header></Header>
            <main className="bg-[url('/imagenes/reproductor.jpg')] inset-0 bg-cover bg-center w-full min-h-screen">
                <section className="w-full min-h-screen bg-[#000b] p-5 lg:p-10 gap-5">
                    <div className="w-full rounded-xl bg-[#DAA52099] grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 shadow-2xl mb-5 p-5 relative">
                        <span className="col-span-1 p-3 flex items-center justify-center">
                            <img src={listas.CancionCaratula} className="w-[250px] rounded-xl" alt="" />
                        </span>
                        <span className="col-span-2 lg:col-span-3 flex items-center justify-center">
                            {tracks.length > 0 && (
                                <Player
                                    trackList={tracks}
                                    includeTags={false}
                                    includeSearch={false}
                                    showPlaylist={true}
                                    autoPlayNextTrack={true}
                                    customColorScheme={colors}
                                />
                            )}
                        </span>

                        <i className={`nf ${isHearted ? "nf-fa-heart" : "nf-cod-heart"} text-[#f00] ${isHearted ? "explosion" : ""} absolute text-white font-medium text-[50px] right-[2%] bottom-[10%] cursor-pointer`} onClick={toggleHeart} ></i>
                    </div>
                    <aside className="rounded-xl grid grid-cols-1 lg:grid-cols-5 gap-10">
                        <div className="bg-[#262626bb] hidden lg:block col-span-3 py-5 px-10 rounded-xl overflow-scroll max-h-[400px]">
                            <h4 className="text-white text-[50px] font-medium">Letra</h4>
                            {letra.map((frase, index) => (
                            <p className="text-white text-[25px]">
                               {frase}
                            </p>
                        ))}
                        </div>
                        <span className="bg-[#0f0] col-span-3 lg:col-span-2 w-full aspect-video rounded-xl">
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoid}`} frameborder="0" allowfullscreen></iframe>
                        </span>
                        <div className="bg-[#262626bb] lg:hidden col-span-3 py-5 px-10 rounded-xl overflow-scroll max-h-[600px]">
                            <h4 className="text-white text-[50px] font-medium">Letra</h4>
                            <p className="text-white text-[25px]">
                            {letra} 
                            </p>
                        </div>
                    </aside>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}