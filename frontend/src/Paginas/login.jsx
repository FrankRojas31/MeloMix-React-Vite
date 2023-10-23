import React, { useState } from "react";
import InicioSesion from "../componentes/InicioSesion";
import SesionApis from "../componentes/SesionApis";

export default function Login() {
    const [cambio, setCambio] = useState(true);

    function components() {
        setCambio((prevCambio) => !prevCambio);
    }

    return (
        <>
            <main className="bg-[url('/imagenes/fondo.jpeg')] bg-cover w-full h-screen flex justify-center items-center m-auto">
                <aside className="grid grid-cols-1 md:grid-cols-2 w-11/12">
                    <div className="justify-center items-center hidden md:flex">
                        <span className="bg-[url('/imagenes/logo.jpg')] bg-cover w-[200px] h-[200px] block rounded-[40px]" ></span>
                    </div>
                    <div className="justify-center items-center flex">
                        {cambio ? <InicioSesion onComponentChange={components} /> : <SesionApis onComponentChange={components} />}
                    </div>
                </aside>
            </main>
        </>
    );
}
