const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, validate:{validator:(v)=>/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/.test(v), message:"El correo proveído no es válido"} },
  telefono: { type: String, required:true, validate:{validator:(v)=>/^[\+]?[0-9]{0,3}\W?[(]?0?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v),message:"El telefono proveído no es válido"} },
  contrasena: { type: String, required: true },
  rol: { type: String, enum:["usuario","administrador"], required: true },
  prefiereDark: { type: Boolean, default:false },
  direccion: { type: String }
});

const Usuario = mongoose.model('Usuario', usuarioSchema,'usuarios');
module.exports = Usuario;
