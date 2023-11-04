import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/vista.css"
import Swal from "sweetalert2";
import Registro from "./Registro";
import EAdmin from "./EUsuario";
import MAdmin from "./MAdmin";

export default function VAdmin({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/Usuarios_Administrativos`
        );
        setListas(respuesta.data.Resultado);
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
          `http://localhost:3000/Usuarios_Globales/${usuarioId}`
        );
        if (respuesta.data) {
          setNeedsUpdate(true);
          Swal.fire('Usuario eliminado correctamente');
        } else {
          console.log("Error al eliminar admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div class="relative overflow-x-auto sm:rounded-lg mt-10 w-[90%]">
      <h1 className="w-full text-[30px] font-bold mb-3 flex place-content-between items-center">Administradores <i class="nf nf-fa-plus_circle text-[30px] text-[#090] cursor-pointer" onClick={() => redirigir(<MUsuario />)}></i></h1>
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
                    Posicion
                  </th>
                  <th scope="col" class="px-6 py-3 text-white font-sans text-[20px]">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                {listas.map((lista, index) => {
                const valor = lista.id;
                return (
                  <tr class="border-x-1 border-y-0 bg-white hover:bg-[#eee]" key={valor}>
                    <td class="border-x-1 border-y-0 px-4 py-4 text-black font-sans text-[15px]">
                      {lista.id}
                    </td>
                    <th scope="row" class="border-x-1 border-y-0 flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white overflow-hidden">
                      <img class="w-10 h-10 rounded-full" src={lista.Avatar} alt="Jese image"/>
                        <div class="pl-3">
                          <div class="text-base text-black font-semibold">{lista.Nombre}</div>
                          <div class="font-normal text-black">{lista.Correo}</div>
                        </div>
                    </th>
                    <td class="border-x-1 border-y-0 px-6 py-4 text-black whitespace-nowrap font-sans text-[15px] ">
                      {lista.RolID}
                    </td>
                    <td class="text-black border-0 flex gap-10 justify-center">
                        <i class="nf nf-md-lead_pencil text-[30px] text-[#bb4] cursor-pointer " onClick={() =>{redirigir(<EAdmin components={components}/>); localStorage.setItem("id", valor);}}></i>
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
