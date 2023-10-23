import React from "react";
import Header from "../componentes/Header";
import Footer from "../componentes/Footer";

export default function RMusica(){
    return(
        <>
            <Header></Header>
            <main className="bg-[url('/imagenes/reproductor.jpg')] inset-0 bg-cover bg-center w-full min-h-screen">
                <section className="w-full min-h-screen bg-[#000b] py-10 px-12 gap-5">
                    <div className="w-full rounded-xl bg-[#DAA52099] grid grid-cols-4 shadow-2xl mb-5 p-5">
                        <span className="col-span-1 p-3 flex items-center justify-center">
                            <img src="/imagenes/logo.jpg" className="w-[250px] rounded-xl" alt="" />
                        </span>
                        <span className="col-span-3 flex items-center justify-center">
                            <div className="w-full h-full flex flex-wrap gap-7 content-center justify-center">
                                <h3 className="w-full text-white font-bold text-[60px] text-center">Nombre</h3>
                                <p className="w-full text-white font-medium text-4xl text-center">Artista</p>
                                <span className="w-full flex justify-center relative">
                                    <i className="nf nf-cod-chevron_left text-white font-medium text-[50px] mr-5"></i>
                                    <i className="nf nf-md-pause text-white font-medium text-[50px]"></i>
                                    <i className="nf nf-cod-chevron_right text-white font-medium text-[50px] ml-5"></i>
                                    <i className="nf nf-cod-heart absolute text-white font-medium text-[50px] right-[10%]"></i>
                                </span>
                            </div>
                        </span>
                    </div>
                    <aside className="rounded-xl grid grid-cols-5 gap-10">
                        <div className="bg-[#262626bb] col-span-3 py-5 px-10 rounded-xl overflow-scroll max-h-[400px]">
                            <h4 className="text-white text-[50px] font-medium">Letra</h4>
                            <p className="text-white text-[25px]">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nostrum enim beatae obcaecati ipsam suscipit quibusdam assumenda. Ducimus ex, cumque maxime facilis, nesciunt atque eius dolorem odio officiis, enim quod!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam dolores minus aut nulla possimus incidunt, sed expedita at quas vel labore animi minima laudantium ducimus praesentium dolorum mollitia dolor.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum minus a, corporis error illo doloribus quaerat maxime nemo at ratione. Ratione, alias sed nam enim molestiae voluptas quo laborum exercitationem?
                            </p>
                        </div>
                        <span className="bg-[#0f0] col-span-2 w-full aspect-video rounded-xl">
                            
                        </span>
                    </aside>
                </section>
            </main>
            <Footer></Footer>
        </>
    );
}