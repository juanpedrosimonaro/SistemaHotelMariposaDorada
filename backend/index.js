const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*",methods:["GET","POST","PUT","DELETE"]}});
global.io = io;
const mongoose = require('mongoose');
const schedulerJobs = require('./scheduler');
const reservacionControlador = require('./controladores/reservacionControlador')
require("dotenv").config();

app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
Object.values(schedulerJobs).forEach((job) => job.start());

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
});

app.post('/reservacion', reservacionControlador.registrar);

const PORT = 3000//process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
