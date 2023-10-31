import React, { useEffect, useState } from "react";
import InicioSesion from "../componentes/InicioSesion";
import SesionApis from "../componentes/SesionApis";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserProfile = localStorage.getItem("perfil");
        if (storedUserProfile) {
          navigate("/")
        }
      }, []);
    const [cambio, setCambio] = useState(true);

    function components() {
        setCambio((prevCambio) => !prevCambio);
    }

    return (
        <>
            <main className="bg-[url('/imagenes/fondo.jpeg')] bg-cover w-full h-screen flex justify-center items-center m-auto">
                <aside className="grid grid-cols-1 md:grid-cols-2 w-11/12">
                    <div className="justify-center items-center hidden md:flex">
                        <Link to="/" className="bg-[url('/imagenes/logo.png')] bg-cover w-[200px] h-[200px] block rounded-[40px]" ></Link>
                    </div>
                    <div className="justify-center items-center flex">
                        {cambio ? <InicioSesion onComponentChange={components} /> : <SesionApis onComponentChange={components} />}
                    </div>
                </aside>
            </main>
        </>
    );
}
