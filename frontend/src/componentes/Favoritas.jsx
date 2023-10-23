import React from "react";

export default function Favoritas() {
    const artistas = Array(10).fill(null);
    return (
        <>
            <main className="w-full h-full grid grid-rows-6">
                <h3 className="w-full text-[30px] text-white font-bold text-center">Favoritos</h3>
                <section className="w-full row-span-5 grid grid-cols-2 md:grid-cols-6 gap-5 overflow-y-auto">
                    {artistas.map((_, index) => (
                        <div className="w-full h-[200px] rounded-xl p-4 bg-[#1E1E1E] flex flex-wrap justify-center">
                            <img src="/imagenes/logo.jpg" className="rounded-full w-[150px]" alt="" />
                            <p className="w-full text-[20px] text-white font-bold text-center">Cancion</p>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}