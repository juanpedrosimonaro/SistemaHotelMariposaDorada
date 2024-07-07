import React, {useState, useEffect} from 'react'
import {socket} from './Socket'

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function EventosCercanos() {
  const [eventosCercanos,setEventosCercanos] = useState([{nombreEvento:"Aniversario",fecha:(new Date()).addDays(1)},{nombreEvento:"Cumpleaños",fecha:(new Date()).addDays(2)},{nombreEvento:"Matrimonio",fecha:(new Date()).addDays(3)}])
  useEffect(() => {
    const cambioEventosCercanos = (eventoCercano)=>{console.log(eventoCercano);setEventosCercanos((eventosCercanos)=>[...eventosCercanos.slice(1,3),eventoCercano]);}
    socket.on('eventoCercano', cambioEventosCercanos );
    return ()=>{socket.off('eventoCercano',cambioEventosCercanos)}
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>
            Evento
          </th>
          <th>
            Fecha
          </th>
        </tr>
      </thead>
      <tbody>
      {eventosCercanos.map(evento=>(
        <tr>
          <td>
            {evento.nombreEvento}
          </td>
          <td>
            {evento.fecha.toString()}
          </td>
        </tr>
      ))}
      </tbody>
      {/*<span >{`Fecha:${eventoCercano.fecha} Evento:${eventoCercano.nombreEvento}`}</span>*/}
    </table>
  )
}

export default EventosCercanos
