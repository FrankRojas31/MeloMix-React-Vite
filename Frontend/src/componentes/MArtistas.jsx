import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Vusuarios from "./Vusuarios";

export default function MArtista({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [body, setBody] = useState({
    Nombre: "",
    Foto: "",
    Biografia: "",
  });
  const navigate = useNavigate();

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    if (!body.Nombre || !body.Foto || !body.Biografia) {
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:3000/Registro", body);
      if (respuesta.status === 200) {
        console.log("Usuario registrado exitosamente");
        setBody({
          Nombre: "",
          Foto: "",
          Biografia: "",
        });
      } else {
        console.log("Error al registrar el usuario. Respuesta no exitosa.");
      }
    } catch (error) {
      console.log("Error al registrar el usuario: " + error.message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
      <h1 className="text-3xl font-bold text-center mb-8">Agregar Artista</h1>
        <div className="mb-4">
          <div className="relative">
            <i className="nf nf-fa-user absolute left-3 top-3 text-2xl"></i>
            <input
              type="text"
              value={body.Nombre}
              onChange={cambioEntrada}
              name="Nombre"
              className="w-full pl-12 py-3 border rounded-md outline-none"
              placeholder="Nombre"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <i className="nf nf-fa-picture_o absolute left-3 top-3 text-2xl"></i>
            <input
              type="text"
              value={body.Foto}
              onChange={cambioEntrada}
              name="Foto"
              className="w-full pl-12 py-3 border rounded-md outline-none"
              placeholder="Direcciond de foto"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <i className="nf nf-md-book_account absolute left-3 top-3 text-2xl"></i>
            <input
              type="text"
              value={body.Biografia}
              onChange={cambioEntrada}
              name="Biografia"
              className="w-full pl-12 py-3 border rounded-md outline-none"
              placeholder="Direccion de biografia"
            />
          </div>
        </div>
        <button
          className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={Enviar}
        >
          CREAR CUENTA
        </button>
      </div>
    </div>
  );
}
