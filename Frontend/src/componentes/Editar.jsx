import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Editar() {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [imagen, setImagen] = useState(null);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const autenticado = localStorage.getItem("token");
        const tokencitoSuculento = autenticado.split(".");
        const decodificado = JSON.parse(atob(tokencitoSuculento[1]));
        console.log(decodificado);
        setProfile(decodificado);
        setNombre(decodificado.Nombre);
        setContrasena(decodificado.contrasena);
    }, []);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
    };

    const handleEditar = async () => {
        try {
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("contrasena", contrasena);
            formData.append("imagen", imagen);

            const response = await axios.put(`http://localhost:3000/Usuario_Update/${profile.id}`, formData);
            console.log(response.data);

        } catch (error) {
            console.error("Error al editar el usuario:", error);
        }
    };

    return (
        <>
            <main className="w-full h-full grid grid-rows-4 p-5 gap-10 bg-[#1E1E1E]">
                <input
                    className="w-full py-2 px-4 outline-none focus:bg-[#ddd]"
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    className="w-full py-2 px-4 outline-none focus.bg-[#ddd]"
                    type="text"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="inputarchivo"
                    className="hidden"
                    onChange={handleImagenChange}
                />
                <button className="bg-white hover:bg-[#bbb]">
                    <label htmlFor="inputarchivo" className="w-full h-full hover:cursor-pointer flex items-center justify-center text-[20px]">
                        Imagen
                    </label>
                </button>
                <div className="flex justify-center">
                    <button className="bg-[#2E4053] rounded-xl text-white text-[20px] hover:bg-[#1d3042] font-bold w-1/4" onClick={handleEditar}>
                        Editar
                    </button>
                </div>
            </main>
        </>
    );
}
