import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/vista.css"
import Swal from "sweetalert2";

export default function Vusuarios() {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/users`
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

  const cancelar = (valor) => {
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: false,
    }));
    setBotones(false);
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
          `http://localhost:3000/users/${usuarioId}`
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
  const enviar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se modificaran los datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      let nombre = document.getElementById("1" + valor);
      let apellido = document.getElementById("2" + valor);
      let correo = document.getElementById("3" + valor);
      nombre.style.border = "none";
      apellido.style.border = "none";
      correo.style.border = "none";
      const usuarioId = valor;
      const nombreUsuario = nombre.value;
      const apellidoUsuario = apellido.value;
      const correoUsuario = correo.value;
      try {
        const respuesta = await axios.patch(
          `http://localhost:3000/users/${usuarioId}`,
          {
            "firstName": nombreUsuario,
            "lastName": apellidoUsuario,
            "userName": correoUsuario,
          }
        );
        if (respuesta.data) {
          console.log("Usuario modificado correctamente");
          Swal.fire(
            'Usuario modificado correctamente'
          );
        } else {
          console.log("Error al modificar al usuario");
        }
      } catch (error) {
        console.log(error);
      }
      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    } else {
      let nombre = document.getElementById("1" + valor);
      let apellido = document.getElementById("2" + valor);
      let correo = document.getElementById("3" + valor);
      nombre.style.border = "none";
      apellido.style.border = "none";
      correo.style.border = "none";
      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    }
    setTimeout(() => {
      setNeedsUpdate(true);
    }, 1000);
  };
  const modificar = (valor) => {
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: true,
    }));
    setBotones(true);
  };

  return (
    <>
      

      <section className="tb-vusuarios">
        <div className="tb-scroll">
          <table>
            <thead>
              <tr>
                <th>Modificar</th>
                <th>id</th>
                <th>nombres</th>
                <th>apellidos</th>
                <th>correo</th>
                <th>Borrar</th>
              </tr>
            </thead>
            {listas.map((lista, index) => {
              const valor = lista.id;
              return (
                <tr key={valor}>
                  <td>
                    {!modifiedRows[valor] ? (
                      <button
                        disabled={botones}
                        onClick={() => modificar(valor)}
                      >
                       <i class="nf nf-md-lead_pencil"></i>
                      </button>
                    ) : (
                      <div className="tb-botones">
                        <button onClick={() => cancelar(valor)}><i class="nf nf-oct-x"></i></button>
                        <button onClick={() => enviar(valor)}><i class="nf nf-cod-check"></i></button>
                      </div>
                    )}
                  </td>
                  <td>{lista.id}</td>
                  <td>
                    <input
                      type="text"
                      id={"1" + lista.id}
                      disabled={!modifiedRows[valor]}
                      defaultValue={lista.firstName}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"2" + lista.id}
                      disabled={!modifiedRows[valor]}
                      defaultValue={lista.lastName}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"3" + lista.id}
                      disabled={!modifiedRows[valor]}
                      defaultValue={lista.userName}
                    />
                  </td>
                  <td>
                    <button
                      disabled={botones}
                      onClick={() => borrar(valor)}
                    >
                      <i class="nf nf-cod-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
}
