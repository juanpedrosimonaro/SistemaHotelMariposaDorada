const express = require('express');
const mongoose = require('mongoose');
//const authControlador = require('./controladores/authControlador');
//TODO: reservaControlador
require("dotenv").config();

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.post('/reserva', reservaControlador.registrar);

const PORT = 3000//process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
