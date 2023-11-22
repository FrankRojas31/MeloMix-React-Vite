import { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registro() {
    const [body, setBody] = useState({
        Nombre: "",
        Correo: "",
        Contrasenia: "",
    });

    const [emailVerificationResult, setEmailVerificationResult] = useState(null);
    const [passwordVerificationResult, setPasswordVerificationResult] = useState(null); // Nueva variable para el mensaje de error de la contraseña
    const [emailVerificationMessage, setEmailVerificationMessage] = useState(""); // Nuevo mensaje de error para el correo
    const [passwordVerificationMessage, setPasswordVerificationMessage] = useState(""); // Nuevo mensaje de error para la contraseña
    const [campos, setCampos] = useState(false);

    const VerificarCorreo = async (Enviar) => {
        try {
            const response = await axios.get(`http://localhost:3000/VerificarCorreo/${Enviar}`);
            const resultado = response.data.Estatus;
            if (resultado === "EXISTE") {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al verificar el correo:', error);
            return "Error al verificar el correo.";
        }
    };

    const navigate = useNavigate();

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };

    const passwordRegex = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;

    const Enviar = async () => {
        if (!body.Nombre.length || !body.Correo.length || !body.Contrasenia) {
            setCampos(true);
            return;
        }
        setCampos(false);

        if (!passwordRegex.test(body.Contrasenia)) {
            // La contraseña no cumple con los requisitos.
            setPasswordVerificationResult("INVALIDO");
            setPasswordVerificationMessage("La contraseña debe contener al menos 8 caracteres, incluyendo letras, números y símbolos.");
            return;
        } else {
            setPasswordVerificationResult(""); // Limpiar el mensaje de error si la contraseña es válida.
            setPasswordVerificationMessage("");
        }

        const verificacion = await VerificarCorreo(body.Correo);
        if (verificacion) {
            setEmailVerificationResult("EXISTE");
            setEmailVerificationMessage("El correo ya está registrado, por favor elige otro.");
            return;
        }
        setEmailVerificationResult("VÁLIDO");
        setEmailVerificationMessage("Válido");

        try {
            const respuesta = await axios.post("http://localhost:3000/Registro", {
                Nombre: body.Nombre,
                Correo: body.Correo,
                Contrasenia: body.Contrasenia,
            });
            if (respuesta.data) {
                console.log("Usuario Registrado exitosamente");
                navigate("/inicio");
            }
        } catch (error) {
            console.log("Error al registrar el usuario: " + error);
        }
    };

    return (
        <>
            <main className="is-man">
                <section className="is-sec">
                    <h1 className="is-titulo">REGISTRO</h1>
                    <span className="is-input">
                        <div className="is-logo"><i className="nf nf-fa-user"></i></div>
                        <input
                            type="text"
                            value={body.Nombre}
                            onChange={cambioEntrada}
                            name="Nombre"
                        />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i className="nf nf-md-email"></i></div>
                        <input
                            type="email"
                            value={body.Correo}
                            onChange={cambioEntrada}
                            name="Correo"
                        />
                    </span>
                    <span className="is-input">
                        <div className="is-logo"><i className="nf nf-fa-lock"></i></div>
                        <input
                            type="password"
                            value={body.Contrasenia}
                            onChange={cambioEntrada}
                            name="Contrasenia"
                        />
                    </span>
                    <span className="is-submit">
                        <input type="submit" value="CREAR CUENTA" onClick={() => Enviar()} />
                    </span>
                    <p className="is-p">
                        ¿Ya tienes cuenta? <Link to="/inicio">Iniciar sesión</Link>
                    </p>

                    {emailVerificationResult === "EXISTE" && (
                        <span className="border border-[#f00] bg-[#fcc] text-[#f00] p-2 rounded-[10px]">{emailVerificationMessage}</span>
                    )}
                    {passwordVerificationResult === "INVALIDO" && (
                        <span className="border border-[#f00] bg-[#fcc] text-[#f00] p-2 rounded-[10px]">{passwordVerificationMessage}</span>
                    )}
                    {campos && (
                        <span className="border border-[#f00] bg-[#fcc] text-[#f00] p-2 rounded-[10px]">
                            Todos los campos son obligatorios. Por favor, completa la información.
                        </span>
                    )}
                </section>
            </main>
        </>
    );
}