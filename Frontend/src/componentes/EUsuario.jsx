import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EAdmin() {
    const [convertir, setConvertir] = useState(false)
    const [body, setBody] = useState({
        Nombre: "",
        Correo: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        console.log(id);
        const fetchData = async () => {
          try {
            const respuesta = await axios.get(
              `http://localhost:3000/Usuarios/${id}`
            );
            setBody({
                Nombre: respuesta.data.Resultado[0].Nombre,
                Correo: respuesta.data.Resultado[0].Correo,
                ConvertirAdmin: false,
            });
            console.log(respuesta.data.Resultado[0].Nombre);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

    const cambioEntrada = ({ target }) => {
        const { name, value, type } = target;
        const newValue = type === "checkbox" ? target.checked : value;
        setBody({ ...body, [name]: newValue });
    };
    const cambioConvertir = () => {
        setConvertir(!convertir)
    }


    return (
        <div className="w-full flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-bold text-center mb-8">Modificar Usuario</h1>
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
                        <i className="nf nf-md-email absolute left-3 top-3 text-2xl"></i>
                        <input
                            type="email"
                            value={body.Correo}
                            onChange={cambioEntrada}
                            name="Correo"
                            className="w-full pl-12 py-3 border rounded-md outline-none"
                            placeholder="Correo"
                        />
                    </div>
                </div>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="inputarchivo"
                    className="hidden"
                />
                <button className="bg-white w-full h-[40px] hover:bg-[#eee] mb-4 border rounded-md">
                    <label
                        id="img1"
                        for="inputarchivo"
                        className="w-full h-full hover:cursor-pointer flex items-center justify-center text-[20px]"
                    >
                        Imagen
                    </label>
                </button>
                <div className="mb-4 flex justify-center w-full">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="ConvertirAdmin"
                            checked={convertir}
                            onChange={cambioConvertir}
                            className="mr-2 text-indigo-600"
                        />
                        Convertir en administrador
                    </label>
                </div>
                <button
                    className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Modificar Usuario
                </button>
            </div>
        </div>
    );
}
