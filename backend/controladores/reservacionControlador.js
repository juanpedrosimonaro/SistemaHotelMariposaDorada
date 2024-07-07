const Reservacion = require('../modelos/reservacionModelo'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

const registrar = async (req, res) => {
  try {
    const nuevaReservacion = await Reservacion.create( {...req.body,usuarioId:req.usuario._id,habitacionId:req.params.habitacionId,estado:"porConfirmar"});
    try{await transporter.sendMail({
      from:process.env.MAIL_USERNAME,
      to:nuevaReservacion.correo,
      subject:`${nuevaReservacion.nombreCliente} confirme su reserva en el Hotel Mariposa Dorada`,
      text:`Mesaje Automático del Hotel Mariposa Dorada.

      ${nuevaReservacion.nombreCliente} ${nuevaReservacion.apellidoCliente}, Gracias por realizar la reservación en nuestro Hotel Mariposa Dorada. Un Agente de Ventas se podrá en contacto con usted para realizar la confirmación y su correspondiente pago. Si tienes cualquier duda puede comunicarse al número 0412-555-5555 y se la despejamos a la mayor brevedad posible.

      Hotel Mariposa Dorada, El Paraíso de Paraguaná...`
    });}catch(e){}
    res.status(201).json(nuevaReservacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reservacion', realError:error });
  }
};

module.exports = {registrar}
