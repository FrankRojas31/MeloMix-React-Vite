import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Editar() {
    const [Nombre, setNombre] = useState("");
    const [Contrasenia, setContrasenia] = useState("");
    const [Avatar, setAvatar] = useState(null);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const autenticado = localStorage.getItem("token");
        const tokencitoSuculento = autenticado.split(".");
        const decodificado = JSON.parse(atob(tokencitoSuculento[1]));
        console.log(decodificado);
        setProfile(decodificado);
        setNombre(decodificado.Nombre);
        setContrasenia(decodificado.Contrasenia);
    }, []);

    const handleAvatarChange = (e) => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
            document.getElementById("img").style.backgroundColor = "#84c377"
            console.log(e.target.files[0].name)
        } else {
            setAvatar("Selecciona una imagen");
            document.getElementById("img").style.backgroundColor = "#fff"
        }
    };

    const handleEditar = async () => {
        try {
            if (Avatar !== "Selecciona una imagen" && Avatar !== null && Contrasenia !== undefined) {
                const formData = new FormData();
                formData.append("Nombre", Nombre);
                formData.append("Contrasenia", Contrasenia);
                console.log(Contrasenia); 
                formData.append("Avatar", Avatar);

                const response = await axios.put(`http://localhost:3000/Usuario_Update/${profile.id}`, formData);
                console.log(response.data);
                document.getElementById("img").style.backgroundColor = "#fff";
                Swal.fire('Usuario modificado');
            }else{
                Swal.fire('Debe agregar una imagen y su contraseña');
            }
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
                    value={Nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    className="w-full py-2 px-4 outline-none focus.bg-[#ddd]"
                    type="text"
                    placeholder="Contraseña"
                    value={Contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                />
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="inputarchivo"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
                <button className="bg-white hover:bg-[#bbb]">
                    <label id="img" htmlFor="inputarchivo" className="w-full h-full hover:cursor-pointer flex items-center justify-center text-[20px]">
                        Avatar
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
