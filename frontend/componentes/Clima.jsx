import React, {useState, useEffect} from 'react'
import {socket} from './Socket'

function Clima() {
  const [estadoClima,setEstadoClima] = useState({clima:"despejado",temperatura:"35"})
  useEffect(() => {
    console.log("Indicador clima montado")
    const cambioClima = (estadoClima)=>{setEstadoClima(estadoClima);console.log("Recibido: ",estadoClima);}
    socket.on('clima', cambioClima );
    return ()=>{socket.off('clima',cambioClima)}
  }, []);
  return (
    <>
      <img src={`http://localhost:5173/estadosClima/${estadoClima.clima}.gif`} />
      <p className="text-center" >{`${estadoClima.temperatura} °C`}</p>
    </>
  )
}

export default Clima
