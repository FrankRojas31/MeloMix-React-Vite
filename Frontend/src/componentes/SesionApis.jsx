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
    const [profile, setProfile] = useState([]);
    const [msalInstance, onMsalInstanceChange] = useState();

    const loginHandler = (err, data, msal) => {
        if (!err && data) {
            onMsalInstanceChange(msal);

            const userData = {
                given_name: data.account.name,
                correo: data.account.email,
                picture: data.account.url
            };
            localStorage.setItem("perfil", JSON.stringify(userData));
            navigate("/");
        }
    };

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
                given_name: response.name,
                picture: response.picture.data.url,
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

    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <MicrosoftLogin
                        clientId="b19438d9-1b4b-4b5b-a070-acf903937e51" /* Aqui ira el cliente */
                        authCallback={loginHandler}
                        render={props => (
                            <span className="is-input cursor-pointer" onClick={props.onClick}>
                            <div className="is-logo2"><i className="nf nf-dev-apple"></i></div>
                                <p>Continuar con Microsoft</p>
                            </span>
                        )}
                    />
                    <span className="is-input cursor-pointer" onClick={() => LoginWithGoogle()}>
                        <div className="is-logo2"><i className="nf nf-fa-google"></i></div>
                        <p>Continuar con Google</p>
                    </span>
                    <FacebookLogin
                        appId="298719456344887"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={LoginWithFacebook}
                        callback={responseFacebook}
                        icon='fa-facebook'
                        cssClass='cssFacebok'
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
