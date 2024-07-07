function Testimonio({titulo,autor,texto}){
  return (
    <div className=" w-full md:w-1/3"> 
      <p className="text-center text-[20px]">{titulo}</p>
      <p className="italic my-[20px] text-justify bg-cl1 p-[20px] rounded-[20px]">"{texto}"</p>
      <p className="text-right">{autor}</p>
    </div>
  )
}

export default Testimonio
