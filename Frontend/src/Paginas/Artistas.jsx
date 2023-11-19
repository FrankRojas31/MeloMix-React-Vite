import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Artistas() {
    const [listas, setListas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [artistasFiltrados, setArtistasFiltrados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(
                    `http://localhost:3000/MejoreArtista`
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
          return palabrasBusqueda.every(palabra => minusculaArtista.includes(palabra));
        });
      
        setArtistasFiltrados(filtrarPorNombre);
      };
    const handleSearchChange = (event) => {
        filtroBusqueda(listas, event.target.value);
    };

    return (
        <>
            <Header />
            <main className="w-full min-h-screen bg-[url('/imagenes/artistas.jpg')] bg-cover">
                <div className="w-full bg-[#6669] p-5 block md:flex place-content-between">
                    <h2 className="text-white font-medium text-4xl stroke mb-5 md:m-0">
                        Top de los artistas:
                    </h2>
                    <div className="bg-black rounded-xl w-full  h-[35px] md:w-[600px] flex justify-center items-center ">
                        <input
                            type="text"
                            placeholder="Buscar por nombre de artista"
                            className="w-full h-full pl-[10px] rounded-[5px] text-black outline-none"
                            onChange={handleSearchChange}
                        />
                        <i className="nf nf-fa-search text-white font-medium text-xl m-3"></i>
                    </div>
                </div>
                <div className="w-full min-h-screen p-5 lg:p-20 flex flex-wrap justify-center items-start bg-[#fff6] gap-5">
                    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 place-items-center">
                        {artistasFiltrados.slice(startIndex, endIndex).map((lista, index) => (
                            <Link to={"/artista/" + lista.ArtistaId} key={index}>
                                <article className="w-[225px] h-[225px] p-[20px] bg-[#000a] rounded-[20px] flex flex-wrap justify-center agrandar overflow-hidden">
                                    <img
                                        className="w-[150px] h-[150px] rounded-[40px]"
                                        src={lista.ArtistaFoto}
                                        alt=""
                                    />
                                    <p className="w-full text-center text-white font-medium text-xl stroke">
                                        {lista.ArtistaNombre}
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </section>
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