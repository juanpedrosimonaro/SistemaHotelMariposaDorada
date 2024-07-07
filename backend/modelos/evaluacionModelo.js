const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
  usuarioId: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario'},
  habitacionId: {type:mongoose.Schema.Types.ObjectId,ref:'Habitacion'},
  evaluacion: {type:Number, min:1, max:5, validate:{validator:Number.isInteger,message:'Evaluacion debe ser entero'}, required:true }
})

const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema,'evaluaciones');
module.exports = Evaluacion;
