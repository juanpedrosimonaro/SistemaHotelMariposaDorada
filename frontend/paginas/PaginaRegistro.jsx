import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useAuth } from '../componentes/AuthProvider.jsx';

function PaginaRegistro() {
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
  const { registro } = useAuth();

  const validarCorreo = (value) => {
    const correoRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
    return correoRegex.test(value);
  };

  const validarTelefono = (value) => {
    const telefonoRegex = /^[\+]?[0-9]{0,3}\W?[(]?0?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return telefonoRegex.test(value);
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
    if (validarCorreo(formData.correo) && validarTelefono(formData.telefono) && formData.contrasena == formData.repetirContrasena  ) {
      //axios.post('/api/auth/registro',formData/*{correo,checkIn,checkOut,nombreCliente,apellidoCliente,telefono,adultos,ninos,habitaciones}*/)
    registro(formData)
    }
  };

  return (
    <>
    <h1>Registro</h1>
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
      <TextField
        label="Repetir Contraseña"
        name="repetirContrasena"
        type="password"
        variant="outlined"
        className="w-full"
        value={formData.repetirContrasena}
        //onChange={handleContrasena}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Nombre"
        name="nombre"
        variant="outlined"
        className="w-full"
        value={formData.nombre}
        //onChange={handleContrasena}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Apellido"
        name="apellido"
        variant="outlined"
        className="w-full"
        value={formData.apellido}
        //onChange={handleContrasena}
        onChange={handleInputChange}
      />
      <TextField
        label="Teléfono"
        name="telefono"
        variant="outlined"
        className="w-full"
        value={formData.telefono}
        //onChange={handleContrasena}
        onChange={handleInputChange}
      />
      <button type="submit">Registrarse</button>
    </form>
    </>
  );
}

export default PaginaRegistro;
