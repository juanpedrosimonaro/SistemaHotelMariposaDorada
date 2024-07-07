const Evaluacion = require('../modelos/evaluacionModelo'); 

const crearEvaluacion = async (req, res) => {
  try {
    const nuevaEvaluacion = await Evaluacion.create({usuarioId:req.usuario._id,habitacionId:req.params.habitacionId, evaluacion:req.body.evaluacion});
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la evaluacion' });
  }
};

/*const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.find({usuarioId:req.usuario._id});
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};*/

const editarEvaluacion = async (req, res) => {
  try {
    const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(
      req.params.id,
      {evaluacion:req.body.evaluacion},
      { new: true }
    );
    if (!evaluacionActualizada) {
      return res.status(404).json({ message: 'Evaluacion no encontrada' });
    }
    res.status(200).json(evaluacionActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la evaluacion' });
  }
};

/*
const eliminarEvaluacion = async (req, res) => {
  try {
    const evaluacionEliminado = await Favorito.findOneAndDelete({usuarioId:req.usuario._id,habitacionId:req.params.id});
    if (!evaluacionEliminado) {
      return res.status(404).json({ message: 'Evaluacion no encontrada' });
    }
    res.status(200).json({ message: 'Evaluacion eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la evaluacion' });
  }
};*/

module.exports = {
  crearEvaluacion,
  //obtenerFavoritos,
  editarEvaluacion,
  //eliminarEvaluacion
}
