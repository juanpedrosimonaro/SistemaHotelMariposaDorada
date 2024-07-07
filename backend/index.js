const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*",methods:["GET","POST","PUT","DELETE"]}});
global.io = io;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
//const schedulerJobs = require('./scheduler');
const authControlador = require('./controladores/authControlador');
const reservacionControlador = require('./controladores/reservacionControlador');
const blogControlador = require('./controladores/blogControlador');
const habitacionRutas = require('./rutas/habitacionRutas');
const reviewsEvaluacionesRutas = require('./rutas/reviewsEvaluacionesRutas');

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI);
//Object.values(schedulerJobs).forEach((job) => job.start());

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
});

// Middlewares
const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'llave_ultra_super_secreta', (err, usuario) => {
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

const autorizarAdministrador = (req, res, next) => {
  if (req.usuario.rol === 'administrador') {
    next();
  } else {
    res.sendStatus(403);
  }
};

const autorizarUsuario = (req, res, next) => {
  if (req.usuario.rol === 'usuario') {
    next();
  } else {
    res.sendStatus(403);
  }
};

app.post('/habitacion/:habitacionId/reservacion', autenticarJWT, autorizarUsuario, reservacionControlador.registrar);

app.post('/auth/login', authControlador.login);
app.post('/auth/registro', authControlador.registro);
app.use('/',habitacionRutas);
app.use('/',reviewsEvaluacionesRutas);
app.post('/articuloMd',autenticarJWT,autorizarAdministrador,blogControlador.guardarArticulo)
app.delete('/articuloMd/:slug',autenticarJWT,autorizarAdministrador, blogControlador.eliminarArticulo)

/*
app.get('/habitacion/:slug', habitacionControlador.obtenerHabitacion);
app.get('/habitaciones/', habitacionControlador.obtenerHabitaciones);
app.post('/habitacion',autenticarJWT, autorizarAdministrador, habitacionControlador.registrar);
app.put('/habitacion',autenticarJWT, autorizarAdministrador, habitacionControlador.editar);
app.delete('/habitacion',autenticarJWT, autorizarAdministrador, habitacionControlador.eliminar);

app.get('/habitacion/:slug/comentarios')
app.get('/habitacion/:slug/ratings')*/

const PORT = 3000//process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
