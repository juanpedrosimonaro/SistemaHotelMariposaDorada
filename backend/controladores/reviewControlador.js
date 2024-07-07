const Review = require('../modelos/reviewModelo'); 

const crearReview = async (req, res) => {
  try {
    const nuevaReview = await Review.create({usuarioId:req.usuario._id,habitacionId:req.params.habitacionId, review:req.body.review});
    const reviewUsuario = await Review.aggregate([
    { $match: { _id: nuevaReview._id } },
    {
     $lookup:{
      from: 'usuarios', 
      localField: 'usuarioId',
      foreignField: '_id',
      as: 'usuario'
     }
    }
    ]);
    res.status(201).json(reviewUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la Review' });
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


const editarReview = async (req, res) => {
  try {
    const reviewActualizada = await Review.findByIdAndUpdate(
      req.params.id,
      {review:req.body.review},
      { new: true }
    );
    if (!reviewActualizada) {
      return res.status(404).json({ message: 'Review no encontrada' });
    }
    res.status(200).json(reviewActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la review' });
  }
};

const eliminarReview = async (req, res) => {
  try {
    const reviewEliminada = await Review.findByIdAndDelete(req.params.id);
    if (!reviewEliminada) {
      return res.status(404).json({ message: 'Review no encontrada' });
    }
    res.status(200).json({ message: 'Review eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la review' });
  }
};

module.exports = {
  crearReview,
  //obtenerProductos,
  //obtenerProducto,
  editarReview,
  eliminarReview 
}
