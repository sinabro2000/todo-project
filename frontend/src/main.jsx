  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App'
  import { AuthProvider } from "./context/AuthContext";
  import { GoogleOAuthProvider } from "@react-oauth/google";


  createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="327038395876-5gd9lmrp2fa2sca2l90e6cl3a8ugv05u.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  )
