import {useState,useEffect} from 'react';
function Servicio ({Icono}){
  
  const [nombreServicio,setNombreServicio] = useState("");

  return (
    <div className="w-[100px] "> 
      {<Icono setNombreServicio={setNombreServicio} className="text-cl2 fill-current " />} 
      <p className="text-center items-center justify-center text-cl2 text-bold mt-[20px]">{nombreServicio || "Nombre Servicio"}{/*nombre*/}</p>
    </div>
  )
}

export default Servicio
