import React, { useState, useEffect, useContext } from "react";
import "../css/login.css"
import { Link, useNavigate } from "react-router-dom";
import InicioSesion from "../componentes/InicioSesion";
import Registro from "../componentes/Registro";
export default function Signin() {
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserProfile = localStorage.getItem("perfil");
        const storedToken = localStorage.getItem("token");
        if (storedUserProfile || storedToken) { //Se agrega para que devuelva.
          navigate("/")
        }
      }, []);
    return (
        <>
            <main className="bg-[url('/imagenes/fondo.jpeg')] bg-cover w-full h-screen flex justify-center items-center m-auto">
            <aside className="grid grid-cols-1 lg:grid-cols-2 w-11/12">
                    <div className="justify-center items-center hidden lg:flex">
                        <span className="bg-[url('/imagenes/logo.jpg')] bg-cover w-[200px] h-[200px] block rounded-[40px]" ></span>
                    </div>
                    <div className="justify-center items-center flex">
                        <Registro></Registro>
                    </div>
                </aside>
            </main>
        </>
    );
}