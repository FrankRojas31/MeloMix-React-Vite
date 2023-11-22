import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";
export default function Nosotros(){
    return(
        <>
            <Header/>
            

            <div className="w-screen h-[300px] bg-[url('/imagenes/music.png')] bg-cover flex justify-center items-center">
                <div className="banner_fondo">
                    <h1 className="h1 text-[30px] md:text-[45px] stroke">La mejor música solo está en </h1>
                    <p className="h1 text-[30px] md:text-[45px]  stroke"><em> ¡MELOMIX!</em></p>
                </div>
            </div>

            <main className="bg-[url('/imagenes/cd.jpg')] w-full bg-cover">
                <section className="w-full min-h-screen bg-[#000b] p-[60px] lg:p-20">

                    <div className="gap-10 colums-1 md:columns-3 text-justify">
                        <div className="flex flex-col items-center">
                            <img src="/imagenes/mision.png" alt="Imagen 2" className="object-cover rounded-full relative h-48 w-48 mx-18 ml-18 my-3  bg-clip-padding p-3 border-4 border-dashed border-gray-500" />
                            <h1 className=" h1 stroke text-center text-fuchsia-400 text-4xl font-semibold text-center">MISIÓN</h1>
                            <p className="text-center text-white text-xl font-semibold text-center">
                                Nuestra principal misión es el fomentar conexiones emocionales a través de la música ofreciendo a nuestros usuarios una experiencia única
                                y personalizada donde la diversidad musical se convierte en un puente que conecta corazones y culturas</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <img src="/imagenes/vision.png" alt="Imagen 3" className="object-cover rounded-full relative h-48 w-48 mx-18 ml-18 my-3  bg-clip-padding p-3 border-4 border-dashed border-gray-500" />
                            <h1 className=" h1 stroke text-center text-blue-600 text-4xl font-semibold text-center">VISIÓN</h1>
                            <p className="text-center text-white text-xl font-semibold text-center">
                                En Melomix la principal visión es ser el éxito digital en la cual los amantes de la música encuentren su hogar.
                                Queremos inspirar una comunidad vibrante y global donde cada nota, cada género y cada historia musical tenga un lugar.</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <img src="/imagenes/valores.png" alt="Imagen 2" className="object-cover rounded-full relative h-48 w-48 mx-18 ml-18 my-3  bg-clip-padding p-3 border-4 border-dashed border-gray-500" />
                            <h1 className=" h1 stroke text-center text-purple-500 text-4xl font-semibold text-center">VALORES</h1>
                            <p className="text-center text-white text-xl font-semibold text-center">
                                Nuestra pasión por la música nos lleva a desarrollar valores fundamentales que hacen original a Melomix. Orientados siempre por la amabilidad, disciplina, lealtad, paciencia, y la honestidad,
                                en la que creamos un espacio personal junto con la empatía y el respeto expresandose en cada una de nuestras notas musicales.</p>
                        </div>
                    </div>

                </section>

            </main>
            <Footer/>
        </>
    );
}