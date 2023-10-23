import React from "react";

export default function Editar() {
    return (
        <>
            <main className="w-full h-full grid grid-rows-4 p-5 gap-10 bg-[#1E1E1E]">
                <input className="w-full py-2 px-4 outline-none focus:bg-[#ddd]" type="text" placeholder="Nombre"/>
                <input className="w-full py-2 px-4 outline-none focus:bg-[#ddd]" type="text" placeholder="Contraseña"/>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="inputarchivo"
                    className="hidden"
                />
                <button className="bg-white hover:bg-[#bbb]">
                    <label id="img1" for="inputarchivo" className="w-full h-full hover:cursor-pointer flex items-center justify-center text-[20px]">
                        Imagen
                    </label>
                </button>
                <div className="flex justify-center">
                    <button className="bg-[#2E4053] rounded-xl text-white text-[20px] hover:bg-[#1d3042] font-bold w-1/4">Editar</button>
                </div>
            </main>
        </>
    );
}