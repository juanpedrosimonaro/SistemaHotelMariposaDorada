import {useState,useEffect} from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import TextField from '@mui/material/TextField';
import ImageUploading from 'react-images-uploading';
import axios from 'axios'
import { useAuth } from '../componentes/AuthProvider.jsx';

const comodidades = ["Baño privado", "Control de temperatura","Televisión","Mini-nevera","Cafetera","Secador de pelo","Plancha y tabla de planchar","Caja fuerte","Alarma","Sala de estar","Concierge"]

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    }
    fr.readAsDataURL(file);
  });
}

function PaginaHabitaciones() {
  const {habitaciones, setHabitaciones} = useOutletContext();
  const { slug } = useParams();
  //const [habitacion, setHabitacion] = useState(habitaciones.find(habitacion=>habitacion.slug == slug))
  const habIndex = habitaciones.findIndex(habitacion=>habitacion.slug == slug)
  console.log("Slug: ",slug," HabIndex: ",habIndex," Habitacion: ",habitaciones[habIndex])
  const habitacion = habitaciones[habIndex]
  const [numTarifas, setNumTarifas] = useState(habitacion?.tarifas.length || 1 )
  const { usuarioData, authToken } = useAuth();
  const [usuarioEvaluacion, setUsuarioEvaluacion] = useState(null); //{evaluacion:usEval?.evaluacion || 0,_id:usEval?._id || null});
  const [imagenes, setImagenes] = useState( habitacion?.imagenes || []);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(new Date().addDays(1).toISOString().split("T")[0]);
  const [adultos, setAdultos] = useState(1);
  const [ninos, setNinos] = useState(0);
  const maxNumber = 69;

  useEffect(()=>{
    if (habitacion && usuarioData?.rol == "administrador"){
      (async()=>{
      const imagenesResponses = await Promise.all(habitacion.imagenes.map(imagenUrl=>axios.get(imagenUrl,{responseType:'blob'})))
      const imagenesBlobs = imagenesResponses.map(res=>({blob:res.data,type:res.headers['content-type']}));
      const imagenesFiles = imagenesBlobs.map((resBlob,index)=>new File([resBlob.blob],/\/([^\/]+)$/.exec(habitacion.imagenes[index])[1],{type:resBlob.type}))
      const imagenesBase64 = await Promise.all(imagenesBlobs.map(imagenBlob=>readAsDataURL(imagenBlob.blob)));
      setImagenes(imagenesBase64.map((imagenBase64,index)=>({data_url:imagenBase64,file:imagenesFiles[index]})))
      })()
    }
    if (habitacion && usuarioData?.rol == "usuario"){
      const usEvalIndex = habitacion?.evaluaciones.findIndex(eva=>eva.usuarioId == usuarioData._id);
      console.log("usEvalIndex actualizando: ",usEvalIndex)
      console.log({evaluacion: habitacion?.evaluaciones[usEvalIndex]?.evaluacion || 0,_id:habitacion.evaluaciones[usEvalIndex]?._id || null, index:usEvalIndex})
      setUsuarioEvaluacion({evaluacion: habitacion?.evaluaciones[usEvalIndex]?.evaluacion || 0,_id:habitacion.evaluaciones[usEvalIndex]?._id || null, index:usEvalIndex});
    }
  },[habitacion]);


  const onImagenesChange = (imageList, addUpdateIndex) => {
    // data for submit
    //console.log(imageList, addUpdateIndex);
    setImagenes(imageList);
  };

  const tarifasInputs = [];
  for(let i=0;i<Math.max(numTarifas,habitacion?.tarifas?.length);i++){
    tarifasInputs.push(<div key={`tarifa${i}`}>
      <input type="text" name={`tarifas[${i}][condicion]`} defaultValue={i<habitacion?.tarifas?.length ? habitacion?.tarifas[i]?.condicion : ""} placeholder={`Condicion ${i+1}`} />
      <input type="text" name={`tarifas[${i}][precio]`} defaultValue={i<habitacion?.tarifas?.length ? habitacion?.tarifas[i]?.precio : ""} placeholder={`Precio ${i+1}`} />
    </div>)
  }

  const obtenerTarifas = (arrayElements) =>{
    const tarifas = [];
    const regex = /^tarifas\[(\d+)\]\[(\w+)\]$/;
    arrayElements.filter(el=>el.name.match(regex)).forEach(el=>{
      const [,index,campo] = el.name.match(regex);
      const value = el.value;
      if(!tarifas[index]) { tarifas[index]={}};
      tarifas[index][campo] = value
    })
    return tarifas
  }

  const handleHabitacionSubmit = (e) =>{
    e.preventDefault();
    const habitacionEditada = {
      _id: e.target._id.value,
      nombre: e.target.nombre.value,
      slug: e.target.slug.value,
      descripcion: e.target.descripcion.value,
      cantidadMaxima: e.target.cantidadMaxima.value,
      tarifas: obtenerTarifas(Array.from(e.target.elements)),
      comodidades: Array.from(e.target.elements['comodidades[]']).filter(checkbox=>checkbox.checked).map(checkbox=>checkbox.value),
      imagenesHabitacion: imagenes.map((objImagen) => objImagen.file),
    } 
    axios.put(`/api/habitacion/${habitacionEditada._id}`,habitacionEditada,{headers: {"Authorization": `Bearer ${authToken}`,'Content-Type': 'multipart/form-data'}}).then(res=>setHabitaciones(prevHabitaciones=>[...prevHabitaciones.slice(0,habIndex),{...prevHabitaciones[habIndex],...res.data},...prevHabitaciones.slice(habIndex+1)]))
  }

  const handleEvaluacionChange = (nuevaEvaluacion) =>{
    if(!usuarioEvaluacion._id){
      axios.post(`/api/habitacion/${habitacion._id}/evaluacion`,{evaluacion:nuevaEvaluacion},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{setHabitaciones(prevHabitaciones=>{
        let evaluaciones = prevHabitaciones[habIndex].evaluaciones;
        evaluaciones.push(res.data) 
        return [...prevHabitaciones.slice(0,habIndex),{...prevHabitaciones[habIndex],evaluaciones},...prevHabitaciones.slice(habIndex+1)]
      }); setUsuarioEvaluacion(res.data)});
     
    }
    else{
      axios.put(`/api/evaluacion/${usuarioEvaluacion._id}`,{evaluacion:nuevaEvaluacion},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{setHabitaciones(prevHabitaciones=>{
        let evaluaciones = prevHabitaciones[habIndex].evaluaciones;
        evaluaciones = [...evaluaciones.slice(0,usuarioEvaluacion.index), res.data, ...evaluaciones.slice(usuarioEvaluacion.index+1)]
        return [...prevHabitaciones.slice(0,habIndex),{...prevHabitaciones[habIndex],evaluaciones},...prevHabitaciones.slice(habIndex+1)]
      }); setUsuarioEvaluacion(res.data)});
    }
  }

  const handleReviewSubmit = (e) =>{
    e.preventDefault();
    axios.post(`/api/habitacion/${habitacion._id}/review`,{review: e.target.review.value},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>setHabitaciones(prevHabitaciones=>{
      let reviews = prevHabitaciones[habIndex].reviews
      reviews.push(res.data[0])
      e.target.review.value="";
      return [...prevHabitaciones.slice(0,habIndex),{...prevHabitaciones[habIndex],reviews},...prevHabitaciones.slice(habIndex+1)]
    }))
  }

  const handleCheckInChange = (event) => {
    const inputValue = event.target.value;
    setCheckIn(inputValue);
  };

  const handleCheckOutChange = (event) => {
    const inputValue = event.target.value;
    setCheckOut(inputValue);
  };

  const handleAdultosChange = (event) => {
    const inputValue = event.target.value;
    setAdultos(inputValue);
  };

  const handleNinosChange = (event) => {
    const inputValue = event.target.value;
    setNinos(inputValue);
  };

  const handleReservacionSubmit = (e) =>{
    event.preventDefault();
    // Comprobar que no haya solapamiento de fechas
    if(habitacion.reservaciones.every(res=>(new Date(res.checkIn) > new Date(checkOut)) || (new Date(checkIn) > new Date(res.checkOut)))){
      axios.post(`/api/habitacion/${habitacion._id}/reservacion`,{checkIn,checkOut,adultos,ninos},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>setHabitaciones(prevHabitaciones=>{
      let reservaciones = prevHabitaciones[habIndex].reservaciones
      reservaciones.push(res.data)
      return [...prevHabitaciones.slice(0,habIndex),{...prevHabitaciones[habIndex],reservaciones},...prevHabitaciones.slice(habIndex+1)]
    }))
    } else {console.log("Hay solapamiento")}

  }
  return(
    <>
      {habitacion != undefined && (usuarioData == null ||  usuarioData.rol == "usuario") ? (
      <>
        <h1>{habitacion.nombre}</h1>
        <div>
          {habitacion.imagenes.map((imagen,index)=>
          <img src={imagen} alt={`Imagen habitacion ${habitacion.nombre} ${index+1} direccion: ${imagen}`} />
          )}
        </div>
        <div>{habitacion.descripcion}</div>
        <div>Cantidad Maxima: {habitacion.cantidadMaxima}</div>
        <div>Comodidades:</div>
      <ul>{habitacion.comodidades.map((comodidad,index)=><li key={index}>{comodidad}</li>)}</ul>
      <table>
        <thead>
          <tr>
            <th> Condicion </th>
            <th> Precio </th>
          </tr>
        </thead>
        <tbody>
        {habitacion.tarifas.map(tarifa=>(
          <tr>
            <td> {tarifa.condicion} </td>
            <td> {tarifa.precio} </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div>Evaluacion: ⭐️{Math.round(habitacion.evaluaciones.reduce((prom, valor, _, { length }) => prom + valor.evaluacion / length, 0)*10**2)/10**2 || 0} </div>
      {usuarioData?.rol == "usuario" && (
      <div>Evaluar Habitacion: {usuarioEvaluacion?.evaluacion != undefined && <ReactStars count={5} value={usuarioEvaluacion?.evaluacion } onChange={handleEvaluacionChange} />} </div>)}
      <div>Reservacines de la habitacion:
        <table>
          <thead>
            <tr>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {habitacion.reservaciones.filter(res=>new Date(res.checkOut) >= new Date()).map(res=>(
              <tr>
                <td>{new Date(res.checkIn).toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone:"UTC"})}</td>
                <td>{new Date(res.checkOut).toLocaleDateString("es",{weekday:"long", year:"numeric", month:"long", day:"numeric", timeZone:"UTC"})}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>¡Reserva esta habitación!</h1>
        {usuarioData==null ? (<p>Necesita <Link to="/ingresar"> ingresar al sistema</Link> para poder reservar</p>) : usuarioData.rol=="usuario" && (
      <form onSubmit={handleReservacionSubmit} className="flex flex-col items-center w-[500px] gap-[30px] my-[20px]">
        <TextField
          type="date"
          label="Check-in"
          variant="outlined"
          className="w-full"
          value={checkIn}
          onChange={handleCheckInChange}
          required
        />
        <TextField
          type="date"
          label="Check-out"
          variant="outlined"
          className="w-full"
          value={checkOut}
          onChange={handleCheckOutChange}
          required
        />
        <TextField
          label="Adultos"
          variant="outlined"
          className="w-full"
          value={adultos}
          onChange={handleAdultosChange}
        />
        <TextField
          label="Niños"
          variant="outlined"
          className="w-full"
          value={ninos}
          onChange={handleNinosChange}
        />
        <button type="submit">Reservar</button>
      </form>
      )}
      <div>
        Reviews: 
        <ul>
          {habitacion?.reviews.map((review,index)=>(
            <li key={review._id}>
              <div>{review?.usuario[0]?.nombre} {review?.usuario[0]?.apellido}:</div>
              <div>{review.review}</div>
            </li>
          ))}
          {usuarioData?.rol == "usuario" && (
            <li key="nuevoReview">
              <form onSubmit={handleReviewSubmit}>
                <input type="text" id="review" name="review" placeholder="Deja tu review aquí..." />
                <input type="submit" value="Subir review" />
              </form>
            </li>
          )}
        </ul>
      </div>
    </>
    ): usuarioData?.rol == "administrador" && (
    <div>
      <h1>Editar habitacion: {habitacion?.nombre}</h1>
      <form className="flex flex-col" onSubmit={handleHabitacionSubmit}>
        <input type="hidden" name="_id" value={habitacion?._id} />
        <input type="text" name="nombre" placeholder="Nombre" defaultValue={habitacion?.nombre}  /> 
        <input type="text" name="slug" placeholder="Slug" defaultValue={habitacion?.slug}  /> 
        {/*<input type="text" name="descripcion" defaultValue={habitacion.descripcion}  /> */}
        <textarea name="descripcion" placeholder="Descripcion" defaultValue={habitacion?.descripcion} />
        <input type="text" name="cantidadMaxima" placeholder="Cantidad Máxima" defaultValue={habitacion?.cantidadMaxima}  /> 
        <button onClick={(e) =>{ e.preventDefault(); setNumTarifas(prevNumTarifas=>prevNumTarifas + 1)}}>Agregar Tarifa</button>
        <button onClick={(e) => {e.preventDefault(); /*numTarifas > 1 &&*/ setNumTarifas(prevNumTarifas=>/*prevNumTarifas-1*/Math.max(prevNumTarifas-1,habitacion?.tarifas?.length||0,1))}}>Eliminar Tarifa</button>
          {tarifasInputs}
            <fieldset className="flex flex-col">
              <legend>Comodidades</legend>
        {comodidades.map(comodidad=><label><input type="checkbox" name="comodidades[]" defaultChecked={habitacion?.comodidades.includes(comodidad)} value={comodidad}/>{comodidad}</label>)} 
            </fieldset>
          <ImageUploading
            multiple
            value={imagenes}
            onChange={onImagenesChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper" {...dragProps}>
                <button
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={(e)=>{e.preventDefault(); onImageUpload()}}
                  
                >
                  Haz click o suelta las imágenes aquí
                </button>
                &nbsp;
                {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={(e) => {e.preventDefault(); onImageUpdate(index)}}>Actualizar</button>
                      <button onClick={(e) =>{ e.preventDefault(); onImageRemove(index)}}>Borrar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        <button type="submit" className="cursor-pointer" >Actualizar</button>
      </form>
    </div>
    )}
    </> 
  )
}

export default PaginaHabitaciones
