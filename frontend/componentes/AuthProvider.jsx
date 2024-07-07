import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie'

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(/*Cookies.get('token')*/localStorage.getItem('token')||null);
  const [usuarioData, setUsuarioData] = useState(/*Cookies.get('usuarioData')*/JSON.parse(localStorage.getItem('usuarioData'))||null);
  const navigate = useNavigate();

  const login = async ({correo, contrasena}) => {
    try {
      const response = await axios.post('/api/auth/login', { correo, contrasena });
      if (response.data.accessToken) {
        const token = response.data.accessToken;
        setAuthToken(token);
        //Cookies.set('token',token)
        localStorage.setItem('token',token)
        
        // Decodificar el JWT para obtener el rol del usuario
        const usuario = jwtDecode(token)//JSON.parse(atob(token.split('.')[1]));
        setUsuarioData(usuario);
        //Cookies.set('usuarioData',usuario)
        localStorage.setItem('usuarioData',JSON.stringify(usuario))
        navigate('/', {replace:true})

      }
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  const registro = async ({correo, nombre, apellido, contrasena,telefono}) => {
    try {
      const response = await axios.post('/api/auth/registro',{correo, nombre, apellido, contrasena,telefono})
      const token = response.data.accessToken;
      setAuthToken(token);
      // Decodificar el JWT para obtener el rol del usuario
      const usuario = jwtDecode(token)//JSON.parse(atob(token.split('.')[1]));
      setUsuarioData(usuario);
      navigate("/", {replace:true});
    } catch (error) {
      console.error('Error en el registro', error);
    }

  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    setUsuarioData(null);
    localStorage.removeItem('usuarioData');
  };

  const value = {
    authToken,
    usuarioData,
    login,
    registro,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
