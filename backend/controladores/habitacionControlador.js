const multer = require('multer');
const Habitacion = require('../modelos/habitacionModelo'); 
const Review = require('../modelos/reviewModelo'); 


const crearHabitacion = async (req, res) => {
  //const {titulo, descripcion, precio, existencia, descuento, imagen, rating, categoria} = req.body;
  try {
    const imagenes = req.files.map(file=>file.path.slice(6));
    const nuevaHabitacion = await Habitacion.create({...req.body,imagenes});
    res.status(201).json(nuevaHabitacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la Habitacion' });
  }
};

const obtenerHabitaciones = async (req, res) => {
  try { 
  const habitacionComentariosEvaluacion = await Habitacion.aggregate([
   {
     $match: { } 
   },
   {
     $lookup: {
       from: 'reviews',
       localField: '_id',
       foreignField: 'habitacionId',
       as: 'reviews',
       pipeline:[
         //{$match:{$expr:{$eq:['$$_id','$roomId']}}}
         {
           $lookup:{
            from: 'usuarios', 
            localField: 'usuarioId',
            foreignField: '_id',
            as: 'usuario'
           }
         }
       ]
     },

   },{
    $lookup: {
      from: 'evaluaciones',
      localField: '_id',
      foreignField: 'habitacionId',
      as: 'evaluaciones'
      }
     },{
    $lookup: {
      from: 'reservaciones',
      localField: '_id',
      foreignField: 'habitacionId',
      as: 'reservaciones'
      }
     }
  ]);
    res.status(200).json(habitacionComentariosEvaluacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las habitaciones' });
  }
};

/*const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const {id} = req.params
    const producto = await Producto.findById(id);
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};*/


const editarHabitacion = async (req, res) => {
  try {
    const imagenes = req.files.map(file=>file.path.slice(6));
    console.log("Body: ",req.body,"Imagenes: ",imagenes,"Files: ",req.files)
    const habitacionActualizada = await Habitacion.findByIdAndUpdate(
      req.params.id,
      {...req.body,imagenes},
      { new: true }
    );
    if (!habitacionActualizada) {
      return res.status(404).json({ message: 'Habitacion no encontrada' });
    }
    res.status(200).json(habitacionActualizada);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar la habitacion', realError:error });
  }
};

const eliminarHabitacion = async (req, res) => {
  try {
    const habitacionEliminada = await Habitacion.findByIdAndDelete(req.params.id);
    if (!habitacionEliminada) {
      return res.status(404).json({ message: 'Habitacion no encontrada' });
    }
    res.status(200).json({ message: 'Habitacion eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la habitacion' });
  }
};

module.exports = {
  crearHabitacion,
  obtenerHabitaciones,
  editarHabitacion,
  eliminarHabitacion,
}
