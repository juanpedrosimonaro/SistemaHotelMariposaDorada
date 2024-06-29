import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios'

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function PaginaReservacion() {
  const [correo, setCorreo] = useState('');
  const [correoError, setCorreoError] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(new Date().addDays(1).toISOString().split("T")[0]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [apellidoCliente, setApellidoCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState(false);
  const [adultos, setAdultos] = useState(1);
  const [ninos, setNinos] = useState(0);
  const [habitaciones, setHabitaciones] = useState(1);

  const validarCorreo = (value) => {
    const correoRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
    return correoRegex.test(value);
  };

  const validarTelefono = (value) => {
    const telefonoRegex = /^[\+]?[0-9]{0,3}\W?[(]?0?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return telefonoRegex.test(value);
  };

  const handleCorreoChange = (event) => {
    const inputValue = event.target.value;
    setCorreo(inputValue);
    setCorreoError(!validarCorreo(inputValue));
  };

  const handleCheckInChange = (event) => {
    const inputValue = event.target.value;
    setCheckIn(inputValue);
  };

  const handleCheckOutChange = (event) => {
    const inputValue = event.target.value;
    setCheckOut(inputValue);
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

  const handleAdultosChange = (event) => {
    const inputValue = event.target.value;
    setAdultos(inputValue);
  };

  const handleNinosChange = (event) => {
    const inputValue = event.target.value;
    setNinos(inputValue);
  };

  const handleHabitacionesChange = (event) => {
    const inputValue = event.target.value;
    setHabitaciones(inputValue);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validarCorreo(correo) && validarTelefono(telefono) ) {
      axios.post('/api/reservacion',{correo,checkIn,checkOut,nombreCliente,apellidoCliente,telefono,adultos,ninos,habitaciones})
    }
  };

  return (
    <>
    <h1>Formulario Reservaciones</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[500px] gap-[30px] my-[20px]">
      <TextField
        label="Correo"
        variant="outlined"
        className="w-full"
        value={correo}
        onChange={handleCorreoChange}
        error={correoError}
        helperText={correoError ? 'Dirección de correo inválida' : ''}
        required
      />
      <TextField
        type="date"
        label="Check-in"
        variant="outlined"
        className="w-full"
        value={checkIn}
        onChange={handleCheckInChange}
        required
      />
      <TextField
        type="date"
        label="Check-out"
        variant="outlined"
        className="w-full"
        value={checkOut}
        onChange={handleCheckOutChange}
        required
      />
      <TextField
        label="Nombre"
        variant="outlined"
        className="w-full"
        value={nombreCliente}
        onChange={handleNombreClienteChange}
        required
      />
      <TextField
        label="Apellido"
        variant="outlined"
        className="w-full"
        value={apellidoCliente}
        onChange={handleApellidoClienteChange}
      />
      <TextField
        label="Teléfono"
        variant="outlined"
        className="w-full"
        value={telefono}
        onChange={handleTelefonoChange}
        error={telefonoError}
        helperText={telefonoError ? 'Teléfono inválido' : ''}
      />
      <TextField
        label="Adultos"
        variant="outlined"
        className="w-full"
        value={adultos}
        onChange={handleAdultosChange}
      />
      <TextField
        label="Niños"
        variant="outlined"
        className="w-full"
        value={ninos}
        onChange={handleNinosChange}
      />
      <TextField
        label="Habitaciones"
        variant="outlined"
        className="w-full"
        value={habitaciones}
        onChange={handleHabitacionesChange}
      />
      <button type="submit">Reservar</button>
    </form>
    </>
  );
}

export default PaginaReservacion;
