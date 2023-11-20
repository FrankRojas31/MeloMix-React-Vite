import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Historial() {
    const [listas, setListas] = useState([]);
    const [profile, setProfile] = useState({});
    const [needsUpdate, setNeedsUpdate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const autenticado = localStorage.getItem("token");

                if (autenticado) {
                    try {
                        const tokencitoSuculento = autenticado.split('.');
                        const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
                        const respuesta = await axios.get(
                            `http://localhost:3000/historial/${decodi64.id}`
                        );
                        setListas(respuesta.data)
                    } catch (error) {
                        console.log("valgo keso JAJAJA")
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        if (needsUpdate) {
            setNeedsUpdate(false);
            fetchData();
        }
    }, [needsUpdate]); // El array de dependencias vacío asegura que este useEffect solo se ejecute después del montaje inicial

    const borrar = async (valor) => {
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará del historial',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            const Id = valor;
            try {
                const respuesta = await axios.delete(
                    `http://localhost:3000/historialdelete/${Id}`
                );
                if (respuesta.data) {
                    setNeedsUpdate(true);
                    Swal.fire('Eliminada correctamente');
                } else {
                    console.log("Error al eliminar admin");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    const borrarTodo = async () => {
        const autenticado = localStorage.getItem("token");
        const tokencitoSuculento = autenticado.split('.');
        const decodi64 = JSON.parse(atob(tokencitoSuculento[1]));
        const { value: confirmed } = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará del historial',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar',
        });

        if (confirmed) {
            try {
                const respuesta = await axios.delete(
                    `http://localhost:3000/historial_borrarTodo/${decodi64.id}`
                );
                if (respuesta.data) {
                    setNeedsUpdate(true);
                    Swal.fire('Eliminada correctamente');
                } else {
                    console.log("Error al eliminar admin");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <main className="w-full h-full">
                <h3 className="w-full text-[30px] text-white font-bold text-center relative">Historial <i class="nf absolute nf-cod-trash text-[30px] text-[#c00] stroke right-5 cursor-pointer" onClick={() => borrarTodo()}></i></h3>
                <section className="w-full h-[300px] overflow-y-auto">
                    {listas.map((lista, index) => (
                        <article className="w-full flex border-t-2 py-2 px-5 place-content-between items-center hover:bg-[#fff2]">
                            <Link to={"/reproductor/" + lista.CancionID} key={index}>
                                <div className="flex w-full gap-5 md:gap-10">
                                    <img src={lista.Caratula} alt="" className="w-[75px] rounded-xl" />
                                    <div>
                                        <p className="text-white text-[25px]">{lista.CancionNombre}</p>
                                        <Link to={"/artista/" + lista.ArtistaId}>
                                            <p className="text-white text-[20px]">{lista.ArtistaNombre}</p>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                            <i class="nf nf-cod-trash text-[30px] text-[#fff] stroke cursor-pointer" onClick={() => borrar(lista.Id)}></i>
                        </article>
                    ))}
                </section>
            </main >
        </>
    );
}
