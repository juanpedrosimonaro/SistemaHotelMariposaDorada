function Habitacion({precio,imagen, titulo,texto}){
  return (
    <div className="w-full flex flex-row my-[20px]"> 
      <img src={`http://localhost:5173/habitaciones/${imagen}`} className="w-1/2"></img>
      <div className="flex flex-col w-1/2 justify-center gap-[30px] px-[10px]">
        <p >{titulo}</p>
        <p >{texto}</p>
        <p >{`Desde $${precio}`}</p>
      </div>
    </div>
  )
}

export default Habitacion
