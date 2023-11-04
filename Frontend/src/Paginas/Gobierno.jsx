import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Gobierno() {
    const [datos, setDatos] = useState([]);
    const [ver, setVer] = useState(true);
    const [pagina, setpagina] = useState(1);  // Página actual
    const [items, setitems] = useState(10);  // Elementos por página

    const fetchData = async () => {
        try {
            const respuesta = await axios.get(
                `https://api.datos.gob.mx/v1/condiciones-atmosfericas?page=${pagina}&limit=${items}`
            );

            if (respuesta.data.results) {
                setDatos(respuesta.data.results);
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pagina, items]);
    const [input, setInput] = useState();
    const escribir = (e) => {
        if (e.target.value == " ") {
            setInput("")
        } else {
            setInput(e.target.value);
        }
    }
    const buscar = () => {
        if (!input) {
            fetchData();
            setVer(true);
            return
        }
        let arreglo = datos;
        let salida = [];
        for (let i = 0; i < arreglo.length; i++) {
            const elemento = arreglo[i].state;
            if (elemento == input) {
                salida.push(arreglo[i]);
            }
        }
        if(salida.length == 0){
            setVer(false);
        }else{
            setDatos(salida);
            setVer(true);
        }
        
    }
    return (
        <>
            <header className="w-full p-3 bg-[#12322b] h-[4em] fixed flex place-content-between px-5 md:px-20">
                <img className="h-full" src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg" alt="" />
                <div className="flex h-full items-center">
                    <p className="text-white font-bold">Tramites</p>
                    <p className="text-white font-bold ml-5">Gobierno</p>
                </div>
            </header>
            <main className="w-full bg-white min-h-screen py-10">
                <div className="w-full h-[350px] flex justify-center items-center bg-[url('https://datos.gob.mx/public/img/uploads/584ae5a01f7f9ea9d5205312/4zIkCJstY3kHyaxN.png')]">
                    <span className="w-1/2 min-w-[400px] flex flex-wrap gap-10">
                        <h1 className="w-full text-center text-[30px] text-white text-[20px]">Descubre <b>Datos Abiertos</b> de tu gobierno.</h1>
                        <div className="w-full h-[50px] flex">
                            <input type="text" className="w-full h-full rounded-l-md outline-none px-5" placeholder="Ej. Aguascalientes" value={input} onChange={escribir} />
                            <i className="nf nf-oct-search w-[50px] text-[20px] p-[5px] bg-[#333] flex items-center justify-center text-white rounded-r-md active:bg-[#555] cursor-pointer" onClick={buscar} tabIndex="0"></i>
                        </div>
                    </span>
                </div>
                <section className="p-10 w-full flex justify-center flex-wrap">
                    <h2 className="w-11/12 text-[40px] text-[#545454] font-bold mb-10 border-b-2">Datos</h2>
                    <span className="min-w-[300px] w-11/12 h-[600px] overflow-scroll flex  flex-wrap justify-center gap-5">
                        {ver ? (
                            <>
                                {datos && datos.map((dato, index) => {
                                    return (
                                        <div className='w-[250px] h-[300px] p-5 bg-[#efefef] rounded-xl flex flex-wrap' id={dato.cityid}>
                                            <p className="w-full text-[45px] text-center text-[#545454] font-bold">{dato.tempc} °C</p>
                                            <p className="w-full text-[20px] text-center text-[#545454] font-[600]">{dato.name}</p>
                                            <p className="w-full text-[17px] text-center text-[#545454] font-[100]">{dato.state}</p>
                                            <p className="w-full text-[18px] text-center text-[#545454] font-[400]">Precipitacion: {dato.probabilityofprecip}%</p>
                                            <p className="w-full text-[18px] text-center text-[#545454] font-[400]">Humedad: {dato.relativehumidity}%</p>
                                            <h1 className="w-full text-[20px] text-center text-[#545454]">{dato.skydescriptionlong}</h1>
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <h1 className="text-[30px]">Busqueda no encontrada</h1>
                            </>
                        )}

                    </span>
                    <div className="w-full flex justify-center gap-5 my-5">
                        <button
                            onClick={() => setpagina(pagina - 1)}
                            disabled={pagina === 1}
                            className="text-[30px] font-bold hover:text-[#bbb]"
                        >
                            <i className="nf nf-fa-angle_double_left hover:text-[#bbb]"></i>
                        </button>
                        <p className="text-[30px] font-bold hover:text-[#bbb]">{pagina}</p>
                        <button
                            onClick={() => setpagina(pagina + 1)}
                            disabled={datos.length < items}
                            className="text-[30px] font-bold"
                        >
                            <i className="nf nf-fa-angle_double_right"></i>
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}