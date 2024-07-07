const mongoose = require('mongoose');
const Evaluacion = require('./evaluacionModelo');
const Review = require('./reviewModelo');
const Reservacion = require('./reservacionModelo');

const comodidades = ["Baño privado", "Control de temperatura","Televisión","Mini-nevera","Cafetera","Secador de pelo","Plancha y tabla de planchar","Caja fuerte","Alarma","Sala de estar","Concierge"]
const extensionesValidas = ["jpg","png","gif","jpeg"]

const habitacionSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidadMaxima: { type: Number, required: true },
  comodidades: {type:[{ type: String, validate:{validator:(value)=>comodidades.includes(value),message:"Comodidad inválida"}, enum:comodidades}],validate:{validator:(value)=>value.length>0,message:"La Habitación debe tener algunas comodidades"}},
  imagenes: [{type:String,validate:{validator:(value)=>extensionesValidas.some((ext)=>value.endsWith(ext)),message:"La URL de la imagen debe de tener una extensión válida"}}],
  tarifas: [{ condicion: {type: String, required:true}, precio:{type:Number, required:true}}],
});

habitacionSchema.post('findOneAndDelete', async ({_id},next) => { 
  console.log('Eliminando Reservaciones');
  await Reservacion.deleteMany({ habitacionId: _id }); 
  console.log('Eliminando evaluaciones');
  await Evaluacion.deleteMany({ habitacionId: _id }); 
  console.log('Eliminando reviews');
  await Review.deleteMany({ habitacionId: _id }); 
  next();
}); 

const Habitacion = mongoose.model('Habitacion', habitacionSchema,'habitaciones');
module.exports = Habitacion;
