import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Vusuarios from "./Vusuarios";

export default function MCancion({ components }) {
    const redirigir = (componente) => {
        components(componente);
    };
    const [body, setBody] = useState({
        Nombre: "",
        Caratula: "",
        Direccion: "",
        Video: "",
        ArtistaId: ""
    });
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriasRespuesta = await axios.get(
                `http://localhost:8081/api/categorias/ObtenerCategorias`
            );
            if (categoriasRespuesta.data.Estatus === "EXITOSO") {
                setListas(categoriasRespuesta.data.Resultado);
                setBody({...body,ArtistaId:categoriasRespuesta.data.Resultado[0].Id})
            } else {
                console.log("Error obteniendo categorías");
            }
        };
        fetchData();
    }, []);

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };

    const Enviar = async () => {
        if (!body.Nombre || !body.Foto || !body.Direccion || !body.Video) {
            return;
        }

        try {
            const respuesta = await axios.post("http://localhost:3000/Registro", body);
            if (respuesta.status === 200) {
                console.log("Usuario registrado exitosamente");
                setBody({
                    Nombre: "",
                    Caratula: "",
                    Direccion: "",
                    Video: "",
                    ArtistaId: ""
                });
            } else {
                console.log("Error al registrar el usuario. Respuesta no exitosa.");
            }
        } catch (error) {
            console.log("Error al registrar el usuario: " + error.message);
        }
    };

    const seleccion = (e) => {
        setBody({ ...body, ArtistaId: e.target.value });
      };

    return (
        <div className="w-full flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
                <h1 className="text-3xl font-bold text-center mb-8">Agregar Cancion</h1>
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
                            value={body.Caratula}
                            onChange={cambioEntrada}
                            name="Caratula"
                            className="w-full pl-12 py-3 border rounded-md outline-none"
                            placeholder="Direcciond de caratula"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <i className="nf nf-md-music_circle absolute left-3 top-3 text-2xl"></i>
                        <input
                            type="text"
                            value={body.Direccion}
                            onChange={cambioEntrada}
                            name="Direccion"
                            className="w-full pl-12 py-3 border rounded-md outline-none"
                            placeholder="Direccion de cancion"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <i className="nf nf-oct-video absolute left-3 top-3 text-2xl"></i>
                        <input
                            type="text"
                            value={body.Video}
                            onChange={cambioEntrada}
                            name="Video"
                            className="w-full pl-12 py-3 border rounded-md outline-none"
                            placeholder="Direccion de Video"
                        />
                    </div>
                </div>
                <div className="mb-4" onChange={seleccion}>
                    <select className="w-full pl-12 py-3 border rounded-md outline-none">
                        {listas.map((lista, index) => {
                            return (
                                <>
                                    <option value={lista.Id}>
                                        {lista.Nombre}
                                    </option>
                                </>
                            );
                        })}
                    </select>
                </div>
                <button
                    className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={Enviar}
                >
                    CREAR CANCION
                </button>
            </div>
        </div>
    );
}
