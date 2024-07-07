import {useState,useEffect} from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader'
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { useAuth } from '../componentes/AuthProvider.jsx';

const comodidades = ["Baño privado", "Control de temperatura","Televisión","Mini-nevera","Cafetera","Secador de pelo","Plancha y tabla de planchar","Caja fuerte","Alarma","Sala de estar","Concierge"]

function PaginaHabitaciones() {
  const {habitaciones, setHabitaciones} = useOutletContext();
  const { usuarioData, authToken } = useAuth();
  const [numTarifas, setNumTarifas] = useState(1);
  const [cantidadMaxima, setCantidadMaxima] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const maxNumber = 69;
  
  const cantidadesMaximas = [];
  habitaciones.forEach(habitacion=>!cantidadesMaximas.includes(habitacion.cantidadMaxima) && cantidadesMaximas.push(habitacion.cantidadMaxima)); 

  const onImagenesChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImagenes(imageList);
  };

  const tarifasInputs = [];
  for(let i=0;i<numTarifas;i++){
    tarifasInputs.push(<div key={`tarifa${i}`}>
      <input type="text" name={`tarifas[${i}][condicion]`} placeholder={`Condicion ${i+1}`} />
      <input type="text" name={`tarifas[${i}][precio]`} placeholder={`Precio ${i+1}`} />
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

  const eliminarHabitacion = (index) =>{
    axios.delete(`/api/habitacion/${habitaciones[index]._id}`,{data:{slug:habitaciones[index].slug},headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{
      setHabitaciones(prevHabitaciones=>[...prevHabitaciones.slice(0,index),...prevHabitaciones.slice(index+1)]);
    }).catch(e=>setError(e.toJSON()))
  }

  const handleHabitacionSubmit = (e) =>{
    e.preventDefault();
    
    const nuevaHabitacion = {
      nombre: e.target.nombre.value,
      slug: e.target.slug.value,
      descripcion: e.target.descripcion.value,
      cantidadMaxima: e.target.cantidadMaxima.value,
      tarifas: obtenerTarifas(Array.from(e.target.elements)),
      comodidades: Array.from(e.target.elements['comodidades[]']).filter(checkbox=>checkbox.checked).map(checkbox=>checkbox.value),
      imagenesHabitacion: imagenes.map((objImagen) => objImagen.file),
    } 
    
    console.log(nuevaHabitacion);
    axios.post("/api/habitacion/",nuevaHabitacion,{headers: {"Authorization": `Bearer ${authToken}`,'Content-Type': 'multipart/form-data'}}).then(res=>setHabitaciones(prevHabitaciones=>[...prevHabitaciones,res.data]));
  }

  return(
    <>
      <select onChange={(e)=>{setCargando(true); setTimeout(()=>{setCargando(false);setCantidadMaxima(e.target.value)},2000)}} >
        <option value="0" disabled selected hidden>Cantidad Maxima de Personas</option>
        <option value="0" >Todos</option>
        {cantidadesMaximas.map(cant=>(
          <option value={cant}>{cant}</option>    
        ))}
      </select>

      <SyncLoader loading={cargando} /> 

      {!cargando && habitaciones.filter(habitacion=>cantidadMaxima<= 0 ? true : habitacion.cantidadMaxima == cantidadMaxima).map((habitacion,habitacionIndex)=>
        <div>
          <img src={habitacion.imagenes[0]} alt={`Imagen habitacion ${habitacion.nombre}`} />
          <p>{habitacion.nombre}</p>
          <p>{habitacion.descripcion}</p>
          <p>Desde: ${Math.min(...habitacion.tarifas.map(tarifa=>tarifa.precio))}</p>
          <p>Evaluacion: ⭐️{Math.round(habitacion?.evaluaciones?.reduce((prom, valor, _, { length }) => prom + valor.evaluacion / length, 0)*10**2)/10**2 || 0} </p> 
          <p>Reviews: {habitacion?.reviews?.length || 0}</p>
          <p><Link to={`/habitacion/${habitacion.slug}`}><button>{usuarioData?.rol=="administrador"? "Editar" :"Detalles"} Habitación</button></Link></p>
          {usuarioData?.rol=="administrador" &&(<button onClick={()=>eliminarHabitacion(habitacionIndex)}>Eliminar Habitación</button>)}
        </div>
      )}
      {usuarioData?.rol=="administrador" && (
        <div>
          <h1>Agregar nueva habitacion:</h1>
          <form className="flex flex-col" onSubmit={handleHabitacionSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" required /> 
            <input type="text" name="slug" placeholder="Slug" required /> 
            {/*<input type="text" name="descripcion" defaultValue={habitacion.descripcion}  /> */}
            <textarea name="descripcion" placeholder="Descripcion" required />
            <input type="text" name="cantidadMaxima" placeholder="Cantidad Máxima" required /> 
            <button onClick={(e) =>{ e.preventDefault(); setNumTarifas(prevNumTarifas=>prevNumTarifas + 1)}}>Agregar Tarifa</button>
            <button onClick={(e) => {e.preventDefault(); numTarifas > 1 && setNumTarifas(prevNumTarifas=>prevNumTarifas-1)}}>Eliminar Tarifa</button>
            {tarifasInputs}
            <fieldset className="flex flex-col">
              <legend>Comodidades</legend>
            {comodidades.map(comodidad=><label><input type="checkbox" name="comodidades[]"  value={comodidad}/>{comodidad}</label>)}            
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
                <div className="bg-cl2 rounded " {...dragProps}>
                  <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={(e)=>{e.preventDefault();onImageUpload()}}
                    
                  >
                    Haz click o suelta las imágenes aquí
                  </button>
                  &nbsp;
                  {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
                  <div className="flex flex-col md:flex-row">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item ">
                      <img src={image['data_url']} alt="" width="100" />
                      <div className="image-item__btn-wrapper flex flex-col">
                        <button onClick={(e) => {e.preventDefault(); onImageUpdate(index)}}>Actualizar</button>
                        <button onClick={(e) => {e.preventDefault(); onImageRemove(index)}}>Borrar</button>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
            </ImageUploading>
            <button type="submit">Crear</button>
          </form>
        </div>
      )}
    </> 
  )
}

export default PaginaHabitaciones
