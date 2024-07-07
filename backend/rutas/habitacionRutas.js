const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { promises: fsp } = require('fs');
const path = require('path');
const habitacionControlador = require('../controladores/habitacionControlador');

const router = express.Router();

const InicializarFileIndex = (req,res,next)=>{req.fileIndex=0; next()}
//let fileIndex = 0;
const storage = multer.diskStorage({
    destination: './public/habitaciones', 
    filename: (req, file, cb) => {
      const habitacionSlug = req.body.slug; 
      const ext = path.extname(file.originalname); 
      req.fileIndex++;
      const filename = `${habitacionSlug}-${req.fileIndex}${ext}`; 
      console.log(filename)
      cb(null, filename); 
    }
});

const upload = multer({ storage });

const borrarImagenesHabitacionAnteriores = async(req,res,next)=>{
  console.log("Intentando borrar: ",req.body)
  const slug = req.body.slug 
  const files = await fsp.readdir('./public/habitaciones') || []
  for (const file of files){
    if(file.startsWith(slug)){
      console.log("Borrando: ",path.join('./public/habitaciones',file))
      await fsp.unlink(path.join('./public/habitaciones',file))
    }
  }
  next();
}

const borrarSobrantes = async(req,res,next)=>{
  const slug = req.body.slug 
  const files = await fsp.readdir('./public/habitaciones') || []
  const inicianConSlug = files.filter(file=> file.startsWith(slug))
  inicianConSlug.slice(req.files.length).forEach(archivo=>fsp.unlink(path.join('./public/habitaciones',archivo)))
  next();
}

const autenticarJWT = (req, res, next) => {
  console.log("Body desde JWT",req.body)
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


// TBD: Comprobar estas rutas funciones
router.get("/habitaciones",habitacionControlador.obtenerHabitaciones);
router.post("/habitacion/",autenticarJWT, autorizarAdministrador, InicializarFileIndex, upload.any('imagenesHabitacion'), habitacionControlador.crearHabitacion);
router.put("/habitacion/:id", autenticarJWT, autorizarAdministrador, InicializarFileIndex, upload.any('imagenesHabitacion'), borrarSobrantes , habitacionControlador.editarHabitacion);
router.delete("/habitacion/:id",autenticarJWT, autorizarAdministrador, borrarImagenesHabitacionAnteriores, habitacionControlador.eliminarHabitacion);

module.exports = router;
