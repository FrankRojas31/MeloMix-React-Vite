import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function InicioSesion({ onComponentChange }) {

  const [body, setBody] = useState({
    Correo: "",
    Contrasenia: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleInicioSesion = async () => {
    if (!body.Correo || !body.Contrasenia) {
      setMensaje("Por favor, complete todos los campos.");
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:3000/Sesion", body);

      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Inicio de sesión exitoso");

        const token = respuesta.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/";
      } else {
        setMensaje("El correo o la contraseña son incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión: " + error);
      setMensaje("Error al iniciar sesión. Por favor, inténtalo nuevamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  return (
    <>
      <main className="is-man relative">
        <section className="is-sec">
          <h1 className="is-titulo">INICIAR SESIÓN</h1>
          <span className="is-input">
            <div className="is-logo">
              <i className="nf nf-md-email"></i>
            </div>
            <input
              type="text"
              name="Correo"
              value={body.Correo}
              onChange={handleChange}
              placeholder="Correo"
            />
          </span>
          <span className="is-input">
            <div className="is-logo">
              <i className="nf nf-fa-lock"></i>
            </div>
            <input
              type="password"
              name="Contrasenia"
              value={body.Contrasenia}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </span>
          <span className="is-submit">
            <button className="submit" onClick={handleInicioSesion}>ACCEDER</button>
          </span>
          <p className="is-p">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
          {mensaje && <p className="error">{mensaje}</p>}
        </section>
        <span
          onClick={() => onComponentChange()}
          className="absolute h-full w-10 bg-black right-0 rounded-tr-[50px] rounded-br-[50px] opacity-0 hover:opacity-20"
        ></span>
      </main>
    </>
  );
}

