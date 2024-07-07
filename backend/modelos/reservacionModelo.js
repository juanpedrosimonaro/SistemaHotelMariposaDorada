const mongoose = require('mongoose');

const reservacionSchema = new mongoose.Schema({
  usuarioId: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', required:true},
  habitacionId: {type:mongoose.Schema.Types.ObjectId,ref:'Habitacion', required:true},
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adultos: { type: Number, required: true }, 
  ninos: { type: Number }, 
  estado:{type: String, enum:['porConfirmar','confirmado','cancelado','diferido','noPresentado'],default:'porConfirmar'}
});

const Reservacion = mongoose.model('Reservacion', reservacionSchema,'reservaciones');
module.exports = Reservacion;
