const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Reservacion = require('./modelos/reservacionModelo')

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

const estadosClima = [
  "despejado",
  "nublado",
  "precipitaciones",
  "tormentaElectrica",
  "granizo",
  "parcialmenteDespejado",
  "precipitacionesSoleado",
];
var climaActual = 0;

const posiblesEventos = [
  "Fiesta!!!",
  "Graduación",
  "Matrimonio",
  "Conferencia",
  "Pijamada",
  "Cumpleaños",
  "Reunión de Negocios"
];
var eventoActual = 0;
var contDias = 0;


const cambioClima = cron.schedule('*/30 * * * * *', () => {
  // Emite un cambio de clima cada 30 segundos
  console.log("Ejecutando clima",estadosClima[climaActual])
  global.io.emit('clima',{clima:estadosClima[climaActual],temperatura:Math.round(Math.random()*(40-25)+25)});
  climaActual++;
;
  if(climaActual>=estadosClima.length)climaActual=0;
});

const cambioEventoCercano = cron.schedule('*/20 * * * * *', () => {
  // Emite un cambio de eventoCercao cada 30 segundos
  console.log("Ejecutando Evento cercano: ",posiblesEventos[eventoActual],new Date().addDays(contDias).toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric"}));
  global.io.emit('eventoCercano',{nombreEvento:posiblesEventos[eventoActual],fecha:new Date().addDays(contDias).toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric"})});
  contDias++;
  eventoActual++;
  if(eventoActual>=posiblesEventos.length)eventoActual=0;
});

const recordatorioConfirmados = cron.schedule('*/10 * * * *',async() => {
  // Envia correos como recordatorios a los clientes confirmados cada 10 minutos
  const reservaciones = await Reservacion.find();
  reservaciones.filter(reservacion=>reservacion.estado=="confirmado").forEach((reservacion)=>{
    transporter.sendMail({
      from:process.env.MAIL_USERNAME,
      to:reservacion.correo,
      subject:`Recordatorio de reservacion para ${reservacion.nombreCliente}`,
      text:`Mesaje Automático del Hotel Mariposa Dorada

      Este es un recordatorio para ${reservacion.nombreCliente} ${reservacion.apellidoCliente} de que tiene una reservación en nuestro Hotel Mariposa con fecha de Check-in: ${reservacion.checkIn.toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric"})} y de Check-out: ${reservacion.checkOut.toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric"})}.
      Cualquier clase de dudas puede llamarnos al 0412-555-5555 y le responderemos con la cordialidad que se merece.

      Hotel Mariposa Dorada, El Paraíso de Paraguaná...`
    })
  });
});

const notificacionPorConfirmar = cron.schedule('*/5 * * * *',async() => {
  // Envia correos como recordatorios a los clientes porConfirmar cada 5 minutos
  const reservaciones = await Reservacion.find();
  reservaciones.filter(reservacion=>reservacion.estado=="porConfirmar").forEach((reservacion)=>{
    transporter.sendMail({
      from:process.env.MAIL_USERNAME,
      to:reservacion.correo,
      subject:`Información concerniente a su reservacion ${reservacion.nombreCliente}`,
      text:`Mesaje Automático del Hotel Mariposa Dorada

      Le hacemos llegar este correo para informarle que su reservacion todavía no se ha confirmado. Por favor comuniquese al numero 0412-555-5555 para solventar esta situación para con su reservacion.

      Hotel Mariposa Dorada, El Paraíso de Paraguaná...`
    })
  });
});

module.exports = {
  cambioClima,
  cambioEventoCercano,
  recordatorioConfirmados,
  notificacionPorConfirmar
}; 
