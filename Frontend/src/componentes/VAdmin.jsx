import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/vista.css"
import Swal from "sweetalert2";

export default function VAdmin({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [Editar, setEditar] = useState(false);
  const [idusuario, setId] = useState(1);
  const [Agregar, setAgregar] = useState(false);

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
          `http://localhost:3000/Delete_Usuario/${usuarioId}`
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

  const [convertir, setConvertir] = useState(false);
  const [body, setBody] = useState({
      Nombre: "",
      Correo: "",
      Avatar: "",
      RolID: 1,
  });

  const cambioEntrada = ({ target }) => {
      const { name, value, type } = target;
      const newValue = type === "checkbox" ? target.checked : value;
      setBody({ ...body, [name]: newValue });
  };

  const cambioConvertir = () => {
      setConvertir(!convertir);
      if (!convertir) {
          setBody({ ...body, RolID: 2 });
      } else {
          setBody({ ...body, RolID: 1 });
      }
  };

  const [body2, setBody2] = useState({
    Nombre: "",
    Correo: "",
    Contrasenia: "",
  });
  const cambioEntrada2 = ({ target }) => {
    const { name, value } = target;
    setBody2({ ...body2, [name]: value });
  };

  const Enviar = async () => {
    if (!body2.Nombre || !body2.Correo || !body2.Contrasenia) {
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:3000/Registro_Admin", body2);
      if (respuesta.status === 200) {
        console.log("Usuario registrado exitosamente");
        setBody2({
          Nombre: "",
          Correo: "",
          Contrasenia: "",
        });
        setNeedsUpdate(true);
        setAgregar(false);
      } else {
        console.log("Error al registrar el usuario. Respuesta no exitosa.");
      }
    } catch (error) {
      console.log("Error al registrar el usuario: " + error.message);
    }
  };

  const modificarUsuario = async () => {
      const id = localStorage.getItem("id");
      try {
          const respuesta = await axios.put(
              `http://localhost:3000/Usuario_Update/${idusuario}`,
              body
          );
          console.log(respuesta.data.message);
          setNeedsUpdate(true);
          setEditar(false);
      } catch (error) {
          console.log(error);
      }
  };

  const modificar = (id, Nombre, Correo, Avatar) => {
    setId(id);
    setBody({
      Nombre: Nombre,
      Correo: Correo,
      Avatar: Avatar,
      RolID: 1,
  });
    setEditar(true);
  }

  return (
    <>
      {Editar && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 absolute z-10">
        <h1 className="text-3xl font-bold text-center mb-8">Modificar Admin</h1>
        <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => {setBody({Nombre: "",Correo: "",Avatar: "",RolID: 1,});setEditar(false);}}
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
                <i className="nf nf-md-email absolute left-3 top-3 text-2xl"></i>
                <input
                    type="email"
                    value={body.Correo}
                    onChange={cambioEntrada}
                    name="Correo"
                    className="w-full pl-12 py-3 border rounded-md outline-none"
                    placeholder="Correo"
                />
            </div>
        </div>
        <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="inputarchivo"
            className="hidden"
        />
        <button className="bg-white w-full h-[40px] hover:bg-[#eee] mb-4 border rounded-md">
            <label
                id="img1"
                for="inputarchivo"
                className="w-full h-full hover:cursor-pointer flex items-center justify-center text-[20px]"
            >
                Imagen
            </label>
        </button>
        <div className="mb-4 flex justify-center w-full">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="ConvertirAdmin"
                    checked={convertir}
                    onChange={cambioConvertir}
                    className="mr-2 text-indigo-600"
                />
                Convertir en usuario
            </label>
        </div>
        <button
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={modificarUsuario}
        >
            Modificar Usuario
        </button>
    </div>
      )}
      {Agregar && (
        <div className="bg-white p-8 rounded-lg shadow-md w-96 absolute z-10">
        <h1 className="text-3xl font-bold text-center mb-8">Agregar Administrador</h1>
        <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => {setBody({Nombre: "",Correo: "",Contrasenia: "",});setAgregar(false);}}
          >
            <i className="nf nf-oct-x text-2xl"></i>
          </button>
          <div className="mb-4">
            <div className="relative">
              <i className="nf nf-fa-user absolute left-3 top-3 text-2xl"></i>
              <input
                type="text"
                value={body2.Nombre}
                onChange={cambioEntrada2}
                name="Nombre"
                className="w-full pl-12 py-3 border rounded-md outline-none"
                placeholder="Nombre"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <i className="nf nf-md-email absolute left-3 top-3 text-2xl"></i>
              <input
                type="email"
                value={body2.Correo}
                onChange={cambioEntrada2}
                name="Correo"
                className="w-full pl-12 py-3 border rounded-md outline-none"
                placeholder="Correo"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <i className="nf nf-fa-lock absolute left-3 top-3 text-2xl"></i>
              <input
                type="password"
                value={body2.Contrasenia}
                onChange={cambioEntrada2}
                name="Contrasenia"
                className="w-full pl-12 py-3 border rounded-md outline-none"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <button
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={Enviar}
          >
            CREAR CUENTA
          </button>
        </div>
      )}

      <div class="relative overflow-x-auto sm:rounded-lg mt-10 w-[90%]">
        <h1 className="w-full text-[30px] font-bold mb-3 flex place-content-between items-center">Administradores <i class="nf nf-fa-plus_circle text-[30px] text-[#090] cursor-pointer" onClick={() => setAgregar(true)}></i></h1>
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
                    <img class="w-10 h-10 rounded-full" src={"/imagenes/"+lista.Avatar} alt="Jese image" />
                    <div class="pl-3">
                      <div class="text-base text-black font-semibold">{lista.Nombre}</div>
                      <div class="font-normal text-black">{lista.Correo}</div>
                    </div>
                  </th>
                  <td class="border-x-1 border-y-0 px-6 py-4 text-black whitespace-nowrap font-sans text-[15px] ">
                    {lista.RolID}
                  </td>
                  <td class="text-black border-0 flex gap-10 justify-center">
                    <i class="nf nf-md-lead_pencil text-[30px] text-[#bb4] cursor-pointer " onClick={() => { modificar(lista.Id, lista.Nombre, lista.Correo, lista.Avatar) }}></i>
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
