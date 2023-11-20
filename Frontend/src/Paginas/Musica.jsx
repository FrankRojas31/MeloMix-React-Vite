import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function Musica() {
    const navigate = useNavigate();
    const artistas = Array(10).fill(null);
    const [listas, setListas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [artistasFiltrados, setArtistasFiltrados] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/MeGustacanciones`
                );
                setListas(respuesta.data);
                setArtistasFiltrados(respuesta.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const filtroBusqueda = (listaArtistas, busqueda) => {
        const palabrasBusqueda = busqueda.toLowerCase().split(' ');
        const filtrarPorNombre = listaArtistas.filter(artist => {
            const minusculaArtista = artist.ArtistaNombre.toLowerCase();
            const minusculaCancion = artist.CancionNombre.toLowerCase(); // Agregado
            return palabrasBusqueda.some(palabra => (
                minusculaArtista.includes(palabra) || minusculaCancion.includes(palabra)
            ));
        });

        setArtistasFiltrados(filtrarPorNombre);
    };

    const handleSearchChange = (event) => {
        filtroBusqueda(listas, event.target.value);
    };

    return (
        <>
            <Header />
            <main className="w-full min-h-screen bg-[url('/imagenes/musica.jpg')] bg-cover">
                <div className="w-full bg-[#000b] p-5 px-10 block md:flex place-content-between">
                    <h2 className="w-full md:text-left text-center text-white font-medium text-4xl stroke mb-5 md:m-0">
                        Top de las Canciones:
                    </h2>
                    <div className="bg-black rounded-xl w-full  h-[35px] md:w-[600px] flex justify-center items-center -ml-[20px]">
                        <input
                            type="text"
                            placeholder="Buscar por nombre de cancion o de artistas"
                            className="w-full h-full pl-[10px] rounded-[5px] text-black outline-none"
                            onChange={handleSearchChange}
                        />
                        <i className="nf nf-fa-search text-white font-medium text-xl m-3"></i>
                    </div>
                </div>
                <div className="w-full min-h-screen bg-[#000b] py-5">
                    <aside className="w-full py-5 px-5 md:px-10 col-span-1">
                        {artistasFiltrados.slice(startIndex, endIndex).map((lista, index) => (
                                <article className="w-full flex border-t-2 py-2 px-5 place-content-between items-center hover:bg-[#fff2]" onClick={()=>navigate("/reproductor/" + lista.CancionId)}>
                                    <div className="flex gap-5 md:gap-10">
                                        <img src={lista.CancionCaratula} alt="" className="w-[75px] rounded-xl" />
                                        <div>
                                            <p className="text-white text-[25px] overflow-hidden">{lista.CancionNombre}</p>
                                            <Link to={"/artista/" + lista.ArtistaId}>
                                                <p className="text-white text-[20px]" onClick={()=>navigate("/artista/" + lista.ArtistaId)}>{lista.ArtistaNombre}</p>
                                            </Link>
                                        </div>
                                    </div>

                                    <p className="text-white text-[25px]">{lista.CancionDuracion}</p>
                                </article>
                        ))}
                    </aside>
                    <div className="w-full flex flex-wrap mt-4 justify-center px-5">
                        {[...Array(Math.ceil(artistasFiltrados.length / itemsPerPage)).keys()].map(
                            (pageNumber) => {
                                const pageValue = pageNumber + 1;
                                const isCurrentPage = pageValue === currentPage;
                                const isEllipsis = artistasFiltrados.length > 10 && (
                                    (pageValue < currentPage - 1 && currentPage > 2) ||
                                    (pageValue > currentPage + 1)
                                );

                                return (
                                    <button
                                        key={pageValue}
                                        onClick={() => handlePageChange(pageValue)}
                                        className={`mx-1 px-3 py-1 ${isCurrentPage ? "bg-[#fff] text-black" : "bg-[#000] text-white hover:bg-[#222]"
                                            } rounded m-2 ${isEllipsis ? "hidden" : ""}`}
                                    >
                                        {isEllipsis ? "..." : pageValue}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}