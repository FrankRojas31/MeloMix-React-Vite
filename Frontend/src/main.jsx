import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="56008524953-0khqd3iu94qtkfp2d5e7mghiqn4h48q0.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
  </GoogleOAuthProvider>,
)
