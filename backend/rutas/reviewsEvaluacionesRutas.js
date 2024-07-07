const express = require('express');
const reviewControlador = require('../controladores/reviewControlador');
const evaluacionControlador = require('../controladores/evaluacionControlador');
const jwt = require('jsonwebtoken');

const router = express.Router();

const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.usuario = usuario;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

/*
const autorizarAdministrador = (req, res, next) => {
  if (req.usuario.rol === 'administrador') {
    next();
  } else {
    res.sendStatus(403);
  }
};*/

const autorizarUsuario = (req, res, next) => {
  if (req.usuario.rol === 'usuario') {
    next();
  } else {
    res.sendStatus(403);
  }
};

router.post("/habitacion/:habitacionId/review",autenticarJWT,autorizarUsuario,reviewControlador.crearReview)
router.put("/review/:id",autenticarJWT,autorizarUsuario,reviewControlador.editarReview)
router.delete("/review/:id",autenticarJWT,autorizarUsuario,reviewControlador.eliminarReview)

router.post("/habitacion/:habitacionId/evaluacion",autenticarJWT,autorizarUsuario,evaluacionControlador.crearEvaluacion)
router.put("/evaluacion/:id",autenticarJWT,autorizarUsuario,evaluacionControlador.editarEvaluacion)
//router.delete("/evaluacion/:evaluacionId",autenticarJWT,autorizarUsuario,evaluacionControlador.eliminarEvaluacion)
module.exports = router
