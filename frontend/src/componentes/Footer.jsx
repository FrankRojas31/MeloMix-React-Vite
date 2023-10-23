import React from "react";
export default function Footer() {
    return (
        <>
            <footer className="w-full h-[80px] bg-[#1E1E1E] flex justify-center items-center">
                <figure className="w-[60px] h-[60px] flex justify-center items-center mr-[10px]"><img className="w-[60px] h-[60px] rounded-full mr-[10px]" src="/imagenes/logo.jpg" alt="" /></figure>
                <p className="text-[17px] text-white">© 2023 Melomix | Condiciones de uso | Aviso de privacidad</p>
            </footer>
        </>
    );
}