import React, { useState, useEffect, useContext } from "react";
import "../css/login.css";
export default function SesionApis({ onComponentChange }) {
    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <span className="is-input">
                        <div className="is-logo2"><i class="nf nf-dev-apple"></i></div>
                        <p>Continuar con Apple</p>
                    </span>
                    <span className="is-input">
                        <div className="is-logo2"><i class="nf nf-fa-google"></i></div>
                        <p>Continuar con Google</p>
                    </span>
                    <span className="is-input">
                        <div className="is-logo2"><i class="nf nf-fa-facebook_official"></i></div>
                        <p>Continuar con Facebook</p>
                    </span>

                </section>
                <span
                    onClick={() => onComponentChange()}
                    className="absolute h-full w-10 bg-black left-0 rounded-tl-[50px] rounded-bl-[50px] opacity-0 hover:opacity-20"
                ></span>
            </main>
        </>
    );
}