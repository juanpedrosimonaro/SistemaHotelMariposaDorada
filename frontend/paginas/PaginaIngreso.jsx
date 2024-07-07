import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useAuth } from '../componentes/AuthProvider.jsx';

function PaginaIngreso() {
 /* const [correo, setCorreo] = useState('');
  const [correoError, setCorreoError] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(new Date().addDays(1).toISOString().split("T")[0]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState(false);
  const [adultos, setAdultos] = useState(1);
  const [ninos, setNinos] = useState(0);
  const [habitaciones, setHabitaciones] = useState(1);*/

  const [formData, setFormData] = useState({});
  const [correoError, setCorreoError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const { login } = useAuth();

  const validarCorreo = (value) => {
    const correoRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
    return correoRegex.test(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name=="correo")setCorreoError(!validarCorreo(value));
    if(name=="telefono")setTelefonoError(!validarTelefono(value));
    setFormData(prevFormData =>({ ...prevFormData, [name]: value }));
  };

/*
  const handleCorreoChange = (event) => {
    const inputValue = event.target.value;
    setCorreo(inputValue);
    setCorreoError(!validarCorreo(inputValue));
  };

  const handleNombreClienteChange = (event) => {
    const inputValue = event.target.value;
    setNombreCliente(inputValue);
  };

  const handleApellidoClienteChange = (event) => {
    const inputValue = event.target.value;
    setApellidoCliente(inputValue);
  };

  const handleTelefonoChange = (event) => {
    const inputValue = event.target.value;
    setTelefono(inputValue);
    setTelefonoError(!validarTelefono(inputValue));
  };
  */



  const handleSubmit = (event) => {
    event.preventDefault();
    login(formData)
    /*if (validarCorreo(formData.correo) && validarTelefono(formData.telefono) ) {
      axios.post('/api/auth/login',formData/*{correo,checkIn,checkOut,nombreCliente,apellidoCliente,telefono,adultos,ninos,habitaciones})
    }*/
  };

  return (
    <>
    <h1>Iniciar Sesión</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[500px] gap-[30px] my-[20px]">
      <TextField
        label="Correo"
        name="correo"
        variant="outlined"
        className="w-full"
        value={formData.correo}
        //onChange={handleCorreoChange}
        onChange={handleInputChange}
        error={correoError}
        helperText={correoError ? 'Dirección de correo inválida' : ''}
        required
      />
      <TextField
        label="Contraseña"
        name="contrasena"
        type="password"
        variant="outlined"
        className="w-full"
        value={formData.contrasena}
        //onChange={handleContrasena}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
      <p>Si no tiene cuenta <Link to="/registro">Regístrese</Link></p>
    </>
  );
}

export default PaginaIngreso;
