import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Favoritas() {
    const [listas, setListas] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUserProfile = localStorage.getItem("perfil");
                const userProfile = JSON.parse(storedUserProfile);
                setProfile(userProfile);

                if (userProfile && userProfile.id) {
                    const respuesta = await axios.get(
                        `http://localhost:3000/megusta/${userProfile.id}`
                    );
                    setListas(respuesta.data);
                    console.log(respuesta.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); // El array de dependencias vacío asegura que este useEffect solo se ejecute después del montaje inicial

    return (
        <>
            <main className="w-full h-full">
                <h3 className="w-full text-[30px] text-white font-bold text-center">Historial</h3>
                <section className="w-full h-[300px] overflow-y-auto">
                    {listas.map((lista, index) => (
                        <Link to={"/reproductor/" + lista.CancionID} key={index}>
                            <article className="w-full flex border-t-2 py-2 px-5 place-content-between items-center hover:bg-[#fff2]">
                                <div className="flex gap-5 md:gap-10">
                                    <img src={lista.Caratula} alt="" className="w-[75px] rounded-xl" />
                                    <div>
                                        <p className="text-white text-[25px]">{lista.CancionNombre}</p>
                                    </div>
                                </div>

                                <p className="text-white text-[25px]">{lista.Duracion}</p>
                            </article>
                        </Link>
                    ))}
                </section>
            </main>
        </>
    );
}