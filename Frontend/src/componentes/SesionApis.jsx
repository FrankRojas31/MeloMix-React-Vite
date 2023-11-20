import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "../css/login.css";
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import MicrosoftLogin from "react-microsoft-login";

export default function SesionApis({ onComponentChange }) {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const VerificarCorreo = async (Enviar) => {
        try {
            const response = await axios.get(`http://localhost:3000/VerificarCorreo/${Enviar}`);
            const resultado = response.data.Estatus;
            if (resultado === "EXISTE") {
                const datos = {
                    mensaje: "El correo ya está registrado",
                    token: response.data.token
                };
                console.log(datos);
                return datos;
            } else {
                return { mensaje: "Válido" };
            }
        } catch (error) {
            console.error('Error al verificar el correo:', error);
            return { mensaje: "Error al verificar el correo." };
        }
    };    

    const LoginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const LoginWithFacebook = () => {
        console.log('Botón de Facebook clicado');
    };

    const responseFacebook = async (response) => {
        if (response.accessToken) {
            const body = response.email;
            console.log(response.email);
            const verificacion = await VerificarCorreo(body);
    
            if (verificacion.mensaje === "El correo ya está registrado, por favor elige otro.") {
                const token = verificacion.token;
                localStorage.setItem("token", token);
                console.log("Usuario Verificado. Token almacenado en localStorage.");
            } else {
                try {
                    const respuesta = await axios.post("http://localhost:3000/RegistroApi", {
                        Nombre: response.name,
                        Correo: response.email,
                        Avatar: response.picture.data.url,
                    });
    
                    if (respuesta.data) {
                        const token = respuesta.data.token;
                        localStorage.setItem("token", token);
                        console.log("Usuario Registrado exitosamente. Token almacenado en localStorage.");
                    }
                } catch (error) {
                    console.log("Error al registrar el usuario: " + error);
                }
            }
        }
    };    
    
    
// --------------------------------------- LOG-IN GOOGLE -------------------------------------------------
useEffect(() => {
    if (user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
            .then(async (res) => {
                console.log("entro")
                const userProfile = res.data;
                const body = userProfile.email;
                console.log(body)
                console.log(res.data);

                // Aquí debes ajustar la lógica según la respuesta del servidor
                const verificacion = await VerificarCorreo(body);

                if (verificacion.mensaje === "El correo ya está registrado") {
                    const token = verificacion.token;
                    localStorage.setItem("token", token);
                    navigate("/");
                } else {
                    try {
                        const respuesta = await axios.post("http://localhost:3000/RegistroApi", {
                            Nombre: userProfile.name,
                            Correo: userProfile.email,
                            Avatar: userProfile.picture,
                        });

                        if (respuesta.data) {
                            const token = respuesta.data.token;
                            localStorage.setItem("token", token);
                            navigate("/");
                        }
                    } catch (error) {
                        console.log("Error al registrar el usuario: " + error);
                    }
                }
            })
            .catch((err) => console.log(err));
    }
}, [user, navigate]);
 

    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <span className="is-input cursor-pointer" onClick={() => LoginWithGoogle()}>
                        <div className="is-logo2"><i className="nf nf-fa-google"></i></div>
                        <p>Continuar con Google</p>
                    </span>
                    <FacebookLogin
                        appId="298719456344887"
                        autoLoad={false}
                        fields="name,email,picture"
                        textButton='Registrate con Facebook'
                        onClick={LoginWithFacebook}
                        callback={responseFacebook}
                        cssClass='iconoFacebok'
                        icon="fa-facebook"
                    />
                </section>
                <span
                    onClick={() => onComponentChange()}
                    className="absolute h-full w-10 bg-black left-0 rounded-tl-[50px] rounded-bl-[50px] opacity-0 hover:opacity-20"
                ></span>
            </main>
        </>
    );
}