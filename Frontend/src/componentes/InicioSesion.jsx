import React from "react";
import { Link } from "react-router-dom";

export default function InicioSesion({ onComponentChange }) {
    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-md-email"></i></div>
                        <input type="text" name="Correo" />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i class="nf nf-fa-lock"></i></div>
                        <input type="text" name="Contrasenia" />
                    </span>
                    <span className="is-submit">
                        <input type="submit" value="ACCEDER" />
                    </span>
                    <p className="is-p">
                        ¿No tienes cuenta? <Link to="/registro">Registrate</Link>
                    </p>
                </section>
                <span
                    onClick={() => onComponentChange()}
                    className="absolute h-full w-10 bg-black right-0 rounded-tr-[50px] rounded-br-[50px] opacity-0 hover:opacity-20"
                ></span>
            </main>
        </>
    );
}
