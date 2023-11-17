import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/vista.css"
import Swal from "sweetalert2";

export default function VCanciones({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [Editar, setEditar] = useState(false);
  const [Agregar, setAgregar] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/canciones`
        );
        setListas(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    if (needsUpdate) {
      setNeedsUpdate(false);
      fetchData();
    }
  }, [needsUpdate]);

  const [body, setBody] = useState({
    Nombre: "",
    Caratula: "",
    Direccion: "",
    Video: "",
    ArtistaId: 1,
    Duracion:""
  });
  const [listas2, setListas2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const categoriasRespuesta = await axios.get(
        `http://localhost:3000/Artista`
      );
      setListas2(categoriasRespuesta.data);
    };
    fetchData();
  }, []);

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    if (!body.Nombre || !body.Caratula || !body.Direccion || !body.Video || !body.Duracion) {
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:3000/canciones", body);
      console.log("Usuario registrado exitosamente");
      setBody({
        Nombre: "",
        Caratula: "",
        Direccion: "",
        Video: "",
        Duracion:""
      });
      setNeedsUpdate(true);
      setAgregar(false);
    } catch (error) {
      console.log("Error al registrar el usuario: " + error.message);
    }
  };

  const seleccion = (e) => {
    setBody({ ...body, ArtistaId: e.target.value });
  };

  const borrar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      const usuarioId = valor;
      try {
        const respuesta = await axios.delete(
          `http://localhost:3000/canciones/${usuarioId}`
        );
        if (respuesta.data) {
          setNeedsUpdate(true);
          Swal.fire('Cancion eliminada correctamente');
        } else {
          console.log("Error al eliminar admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const modificarCancion = async () => {
    try {
      const respuesta = await axios.put(
        `http://localhost:3000/canciones/${id}`,
        body
      );
      console.log(respuesta.data.message);
      setNeedsUpdate(true);
      setEditar(false);
    } catch (error) {
      console.log(error);
    }
  };
  const modificar = (id, Nombre, Caratula, Direccion, Video, ArtistaId, Duracion) => {
    setBody({
      Nombre: Nombre,
      Caratula: Caratula,
      Direccion: Direccion,
      Video: Video,
      ArtistaId:ArtistaId,
      Duracion:Duracion,
    });
    setId(id);
    setEditar(true);
  }

  return (
    <>
      {Editar && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 absolute z-10">
          <h1 className="text-3xl font-bold text-center mb-8">Editar Cancion</h1>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => {setBody({
              Nombre: "",
              Caratula: "",
              Direccion: "",
              Video: "",
              Duracion:"",
            });setEditar(false);}}
          >
            <i className="nf nf-oct-x text-2xl"></i>
          </button>
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
          <div className="mb-4">
            <div className="relative">
              <i className="nf nf-oct-video absolute left-3 top-3 text-2xl"></i>
              <input
                type="text"
                value={body.Duracion}
                onChange={cambioEntrada}
                name="Duracion"
                className="w-full pl-12 py-3 border rounded-md outline-none"
                placeholder="Duracion de la cancion"
              />
            </div>
          </div>
          <div className="mb-4" onChange={seleccion}>
            <select className="w-full pl-12 py-3 border rounded-md outline-none">
            {listas2.map((lista, index) => {
                return (
                  <>
                    <option value={lista.Id} key={lista.Id} >
                      {lista.Nombre}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <button
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={modificarCancion}
          >
            EDITAR CANCION
          </button>
        </div>
      )}
      {Agregar && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 absolute z-10">
          <h1 className="text-3xl font-bold text-center mb-8">Agregar Cancion </h1>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => {
              setBody({
                Nombre: "",
                Caratula: "",
                Direccion: "",
                Video: "",
                Duracion: "",
              }); setAgregar(false);
            }}
          >
            <i className="nf nf-oct-x text-2xl"></i>
          </button>
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
          <div className="mb-4">
            <div className="relative">
              <i className="nf nf-oct-video absolute left-3 top-3 text-2xl"></i>
              <input
                type="text"
                value={body.Duracion}
                onChange={cambioEntrada}
                name="Duracion"
                className="w-full pl-12 py-3 border rounded-md outline-none"
                placeholder="Duracion de la cancion"
              />
            </div>
          </div>
          <div className="mb-4" onChange={seleccion}>
            <select className="w-full pl-12 py-3 border rounded-md outline-none">
              {listas2.map((lista, index) => {
                return (
                  <>
                    <option value={lista.Id} key={lista.Id} >
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
      )}
      <div class="relative overflow-x-auto sm:rounded-lg mt-10 w-[90%]">
        <h1 className="w-full text-[30px] font-bold mb-3 flex place-content-between items-center">Canciones <i class="nf nf-fa-plus_circle text-[30px] text-[#090] cursor-pointer" onClick={() => {setAgregar(true); setBody({ ...body, ArtistaId: listas2[0].Id });}}></i></h1>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-y-1">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3 text-white font-sans text-[20px]">
                ID
              </th>
              <th scope="col" class="px-6 py-3 text-white font-sans text-[20px]">
                Informacion
              </th>
              <th scope="col" class="px-6 py-3 text-white font-sans text-[20px]">
                Cancion url
              </th>
              <th scope="col" class="px-6 py-3 text-white font-sans text-[20px]">
                Video url
              </th>
              <th scope="col" class="px-6 py-3 text-white font-sans text-[20px]">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            {listas.map((lista, index) => {
              const valor = lista.CancionId;
              return (
                <tr class="border-x-1 border-y-0 bg-white hover:bg-[#eee]" key={valor}>
                  <td class="border-x-1 border-y-0 px-4 py-4 text-black font-sans text-[15px]">
                    {lista.CancionId}
                  </td>
                  <th scope="row" class="border-x-1 border-y-0 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white overflow-hidden">
                    <img class="w-10 h-10 rounded-full" src={lista.CancionCaratula} alt="Jese image" />
                    <div class="pl-3">
                      <div class="text-base text-black font-semibold">{lista.CancionNombre}</div>
                      <div class="font-normal text-black">{lista.ArtistaNombre}</div>
                    </div>
                  </th>
                  <td class="border-x-1 border-y-0 px-6 py-4 text-black whitespace-nowrap font-sans text-[15px] max-w-[100px] overflow-scroll ">
                    {lista.CancionDireccion}
                  </td>
                  <td class="border-x-1 border-y-0 px-6 py-4 text-black whitespace-nowrap font-sans text-[15px] ">
                    {lista.CancionVideo}
                  </td>
                  <td class="text-black border-0 flex gap-10 justify-center">
                    <i class="nf nf-md-lead_pencil text-[30px] text-[#bb4] cursor-pointer "onClick={() => { modificar(lista.CancionId, lista.CancionNombre, lista.CancionCaratula, lista.CancionDireccion, lista.CancionVideo,lista.ArtistaId, lista.CancionDuracion) }}></i>
                    <i class="nf nf-cod-trash text-[30px] text-[#d00] cursor-pointer" onClick={() => borrar(valor)}></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}