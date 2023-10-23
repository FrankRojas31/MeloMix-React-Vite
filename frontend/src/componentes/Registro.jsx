import React, { useState, useEffect, useContext } from "react";
import "../css/login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Registro() {
    const [body, setBody] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Contrasenia: "",
    });
    const navigate = useNavigate();
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };

    const Enviar = async () => {
        if (
            !body.Nombre.length ||
            !body.Apellido.length ||
            !body.Correo.length ||
            !body.Contrasenia
        ) {
            return;
        }
        try {
            const respuesta = await axios.post(
                "http://localhost:3000/users/",
                {
                    firstName:body.Nombre,
                    lastName:body.Apellido,
                    userName:body.Correo,
                    password:body.Contrasenia
                }
            );
            if(respuesta.data){console.log("Modificado")}
        } catch (error) {
            console.log("Error al registrar el usuario: " + error);
        }
    };
    return (
        <>
            <main className="is-man">
                <section className="is-sec">
                    <h1 className="is-titulo">REGISTRO</h1>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-fa-user"></i></div>
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                        />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-fa-user"></i></div>
                        <input
                            type="text"
                            value={body.Apellido}
                            onChange={cambioEntrada}
                            name="Apellido"
                        />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-md-email"></i></div>
                        <input
                            type="email"
                            value={body.Correo}
                            onChange={cambioEntrada}
                            name="Correo"
                        />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-fa-lock"></i></div>
                        <input type="text"
                            value={body.Contrasenia}
                            onChange={cambioEntrada}
                            name="Contrasenia"
                        />
                    </span>
                    <span className="is-submit">
                        <input type="submit" value="CREAR CUENTA" onClick={()=>Enviar()}/>
                    </span>
                    <p className="is-p">
                        ¿Ya tienes cuenta? <Link to="/inicio">Iniciar sesion</Link>
                    </p>
                </section>
            </main>
        </>
    );
}