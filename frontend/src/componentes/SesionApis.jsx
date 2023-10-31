import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import "../css/login.css";
import { useNavigate } from 'react-router-dom';
export default function SesionApis({ onComponentChange }) {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
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
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return (
        <>
            <main className="is-man relative">
                <section className="is-sec">
                    <h1 className="is-titulo">INICIAR SESIÓN</h1>
                    <span className="is-input cursor-pointer">
                        <div className="is-logo2"><i class="nf nf-dev-apple"></i></div>
                        <p>Continuar con Apple</p>
                    </span>
                    <span className="is-input cursor-pointer" onClick={() => login()}>
                        <div className="is-logo2"><i class="nf nf-fa-google"></i></div>
                        <p>Continuar con Google</p>
                    </span>
                    <span className="is-input cursor-pointer">
                        <div className="is-logo2"><i class="nf nf-fa-facebook_official"></i></div>
                        <p>Continuar con Facebook</p>
                    </span>

                </section>
                <span
                    onClick={() => onComponentChange()}
                    className="absolute h-full w-10 bg-black left-0 rounded-tl-[50px] rounded-bl-[50px] opacity-0 hover:opacity-20"
                ></span>
            </main>
        </>
    );
}