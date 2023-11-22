import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import Player from '@madzadev/audio-player'

export default function RMusica() {
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);
    const { id } = useParams();
    const [id2, setid2] = useState(id);
    const [videoid, setVideoid] = useState("");
    const [letra, setLetra] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [tracks2, setTracks2] = useState([]);
    const [isHearted, setIsHearted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const toggleHeart = async () => {
        const autenticado = localStorage.getItem("token");
        if (autenticado) {
            try {
                const tokencitoSuculento = autenticado.split('.');
                const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
                const response = await axios.get(`http://localhost:3000/megusta/${decodi64.id}`);
                console.log(response.data)
                const cancionFiltrada = response.data.filter(cancion => cancion.CancionID == id);
                console.log(cancionFiltrada)
                if (isHearted) {
                    // Si está hearted, eliminar el "Me gusta"
                    await axios.delete(`http://localhost:3000/megusta/${cancionFiltrada[0].Id}`);
                    console.log("Se borro")
                } else {
                    // Si no está hearted, agregar el "Me gusta"
                    await axios.post("http://localhost:3000/megusta_usuario", {
                        usuarioId: decodi64.id,
                        cancionId: id
                    });
                    console.log("Se añadio")
                }

                // Actualizar el estado de isHearted después de la acción
                setIsHearted(!isHearted);
            } catch (error) {
                console.log("Error al manejar el clic en 'Me gusta':", error);
            }
        }
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
    const obtenerArregloDesdeLocalStorage = () => {
        const arregloGuardado = localStorage.getItem('historial');
        return arregloGuardado ? JSON.parse(arregloGuardado) : [];
    };
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const autenticado = localStorage.getItem("token");
                if (autenticado) {
                    const tokencitoSuculento = autenticado.split('.');
                    const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));

                    const response = await axios.get(`http://localhost:3000/megusta/${decodi64.id}`);
                    const likedSongs = response.data.map((like) => like.CancionID);

                    setIsHearted(likedSongs.some(songId => songId == id2));
                }
            } catch (error) {
                console.log("Error al obtener los 'Me gusta' del usuario:", error);
            }
        };

        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/canciones/${id2}`
                );
                console.log(respuesta.data[0].CancionDireccion)

                esperarCincoSegundos(() => {
                    const autenticado = localStorage.getItem("token");
                    if (autenticado) {
                        try {
                            const tokencitoSuculento = autenticado.split('.');
                            var decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
                            Enviar(decodi64.id, id);
                        } catch (error) {
                            console.log("valgo keso JAJAJA");
                        }
                    }
                    const siguiente = document.querySelector("._3a3Vy")
                    siguiente.addEventListener("click", function () {
                        const arregloExistente = obtenerArregloDesdeLocalStorage();
                        const nuevoArreglo = [...arregloExistente, id2];
                        localStorage.setItem('historial', JSON.stringify(nuevoArreglo));
                        function generarNumeroAleatorio(min, max) {
                            return Math.floor(Math.random() * (max - min + 1)) + min;
                        }
                        const numeroAleatorio = generarNumeroAleatorio(1, 274);
                        navigate("/reproductor/" + numeroAleatorio);
                        window.location.href = window.location.href;
                    });
                    const anterior = document.querySelector("._3Juzi")
                    anterior.addEventListener("click", function () {
                        const historial = obtenerArregloDesdeLocalStorage();
                        if (historial.length >= 2) {
                            const nuevosElementos = historial.slice(0, -1);
                            localStorage.setItem('historial', JSON.stringify(nuevosElementos));
                            const penultimo = historial[historial.length - 1];
                            navigate("/reproductor/" + penultimo);
                            window.location.href = window.location.href;
                        } else if (historial.length === 1) {
                            localStorage.setItem('historial', JSON.stringify([]));
                            navigate("/reproductor/" + historial[0]);
                            window.location.href = window.location.href;
                        } else {
                            console.log("El arreglo está vacío");
                        }
                    });
                    var element = document.querySelector("._RZMQZ");
                    if (element) {
                        element.classList.add("hidden");
                    }
                });
                setTracks([
                    {
                        url: respuesta.data[0].CancionDireccion,
                        title: `${respuesta.data[0].CancionNombre} - ${respuesta.data[0].ArtistaNombre}`,
                        tags: [id2]
                    },
                ]);
                setListas(respuesta.data[0]);
                const respuesta3 = await axios.get(
                    `http://localhost:3000/letras/${respuesta.data[0].ArtistaNombre}/${respuesta.data[0].CancionNombre}`
                );
                setLetra(respuesta3.data.split('\n'));
                console.log(respuesta.data[0].CancionVideo);
                const respuesta2 = await axios.get(
                    `http://localhost:3000/youtube/${respuesta.data[0].CancionVideo}`
                );
                setVideoid(respuesta2.data[0].id.videoId);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        fetchLikes();
    }, [id2]);

    function esperarCincoSegundos(callback) {
        setTimeout(callback, 100);
    }
    function esperar(callback) {
        setTimeout(callback, 5000);
    }
    const Enviar = async (usuario, cancion) => {
        var body = {
            usuarioId: usuario,
            cancionId: cancion
        }
        try {
            const respuesta = await axios.post("http://localhost:3000/historial", body);
            console.log("Historial agregado");
        } catch (error) {
            console.log("Error al registrar el usuario: " + error.message);
        }
    };
    const handleTrackEnd = () => {
        console.log(tracks2);
        if (tracks2.length > 0) {
            // Obtener el siguiente índice
            const nextIndex = (currentIndex + 1) % tracks2.length;
            setCurrentIndex(nextIndex);

            // Verificar si el objeto en tracks2[nextIndex] existe
            if (tracks2[nextIndex]) {
                // Actualizar la lista de reproducción con el nuevo objeto
                setTracks([
                    {
                        url: tracks2[nextIndex].url,
                        title: `${tracks2[nextIndex].title}`,
                        tags: [tracks2[nextIndex].tags],
                    },
                ]);
            } else {
                // Manejar el caso en el que tracks2[nextIndex] es undefined
                console.error("tracks2[nextIndex] es undefined");
            }
        } else {
            // Manejar el caso en el que tracks2 no tiene elementos
            console.error("tracks2 no tiene elementos");
        }
    };



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
                                <p key={index} className="text-white text-[25px]">
                                    {frase}
                                </p>
                            ))}
                        </div>
                        <span className="col-span-3 lg:col-span-2 w-full aspect-video rounded-xl">
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoid}`} frameborder="0" allowfullscreen></iframe>
                        </span>
                        <div className="bg-[#262626bb] lg:hidden col-span-3 py-5 px-10 rounded-xl overflow-scroll max-h-[600px]">
                            <h4 className="text-white text-[50px] font-medium">Letra</h4>
                            {letra.map((frase, index) => (
                                <p className="text-white text-[25px]">
                                    {frase}
                                </p>
                            ))}
                        </div>
                    </aside>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}