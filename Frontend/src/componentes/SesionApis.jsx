import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "../css/login.css";
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import MicrosoftLogin from "react-microsoft-login"; // Instalar

export default function SesionApis({ onComponentChange }) {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const LoginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const LoginWithFacebook = () => {
        console.log('Botón de Facebook clicado');
    };
    
    const responseFacebook = (response) => {
        if (response.accessToken) {
            const userData = {
                name: response.name,
                picture: response.picture.data.url,
                userName: response.email,
                correo: response.email
            };
    
            localStorage.setItem("perfil", JSON.stringify(userData));
            
            navigate("/");
        }
    };

    
    

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        const userProfile = res.data;
                        setProfile(userProfile);
                        console.log(userProfile);
                        localStorage.setItem("perfil",JSON.stringify(userProfile))
                        navigate("/")
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    /* const logOut = () => {
        googleLogout();
        setProfile(null);
    }; */ //Esto no esta sirviendo en el componente.

    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <MicrosoftLogin
                        clientId={YOUR_CLIENT_ID} /* Aqui ira el cliente */
                        authCallback={authHandler}
                        render={props => (
                            <span className="is-input cursor-pointer" onClick={props.onClick}>
                            <div className="is-logo2"><i className="nf nf-dev-apple"></i></div>
                                <p>Continuar con Microsoft</p>
                            </span>
                        )}
                    />
                    <span className="is-input cursor-pointer" onClick={() => LoginWithGoogle()}>
                        <div className="is-logo2"><i class="nf nf-fa-google"></i></div>
                        <p>Continuar con Google</p>
                    </span>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={LoginWithFacebook}
                        callback={responseFacebook}
                        render={renderProps => (
                            <span className="is-input cursor-pointer" onClick={renderProps.onClick}>
                                <div className="is-logo2"><i className="nf nf-fa-facebook_official"></i></div>
                                <p>Continuar con Facebook</p>
                            </span>
                        )}
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