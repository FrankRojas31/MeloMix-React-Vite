import React, { useEffect, useState } from "react";
import styles from "../css/dashboards.module.css";
import axios from "axios";
import Vusuarios from "./Vusuarios";
import VAdmin from "./VAdmin";
import VArtistas from "./VArtistas";
import VCanciones from "./VCanciones";
import ObtenerMapa from "./ObtenerMapa";

export default function Dashboards({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [valores, setValores] = useState({
    usuario: "Numero",
    admin: "Numero",
    lista: "Numero",
    detalles: "Numero",
  });
  const [fecha, setFecha] = useState({
    call: "",
    hora: "",
  });
  function mostrarFecha() {
    const fechaHora = new Date();
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
    const opcionesHora = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    setFecha({
      call: fechaHora.toLocaleDateString("es-ES", opcionesFecha),
      hora: fechaHora.toLocaleTimeString("en-US", opcionesHora),
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/cantidades`
        );
          setValores({
            usuario: respuesta.data[0].usuarios,
            admin: respuesta.data[0].administradores,
            lista: respuesta.data[0].canciones,
            detalles: respuesta.data[0].artistas,
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const intervalId = setInterval(mostrarFecha, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <section className={styles.componente}>
        <span className={`${styles.hora} ${styles.opcion3}`}>
          <p>
            <i className="nf nf-seti-time_cop"></i> {fecha.hora}
          </p>
          <p>
            <i className="nf nf-fa-calendar"></i> {fecha.call}
          </p>
        </span>
        <span className={`${styles.estadistica} ${styles.opcion3}`}>
          <ObtenerMapa x={21.04845} y={-86.84675}/>
        </span>
        <span
          className={`${styles.usuario} ${styles.opcion}`}
          onClick={() => redirigir(<Vusuarios />)}
        >
          <h3>{valores.usuario} Usuarios</h3>
        </span>
        <span
          className={`${styles.administrador} ${styles.opcion}`}
          onClick={() => redirigir(<VAdmin />)}
        >
          <h3>{valores.admin} Admins</h3>
        </span>
        <span
          className={`${styles.detalles} ${styles.opcion}`}
          onClick={() => redirigir(<VArtistas />)}
        >
          <h3>{valores.detalles} Artistas</h3>
        </span>
        <span
          className={`${styles.listas} ${styles.opcion}`}
          onClick={() => redirigir(<VCanciones />)}
        >
          <h3>{valores.lista} Canciones</h3>
        </span>
      </section>
    </>
  );
}
