const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  correo: { type: String, required: true, validate:{validator:(v)=>/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/.test(v), message:"El correo proveído no es válido"} },
  checkIn: { type: Date, require: true },
  checkOut: { type: Date, require:true },
  nombreCliente: { type: String, required: true },
  apellidoCliente: { type: String },
  telefono: { type: String, required: true, validate:{validator:(v)=>/^[\+]?[0-9]{0,3}\W?[(]?0?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v),message:"El telefono proveído no es válido"} },
  adultos: { type: Number }, 
  ninos: { type: Number }, 
  habitaciones: { type: Number }, 
  estado:{type: String, enum:['porConfirmar','confirmado','cancelado','diferido','noPresentado'],default:'porConfirmar'}
});

const Reservacion = mongoose.model('Reservacion', reservacionSchema,'reservaciones');
module.exports = Reservacion;
