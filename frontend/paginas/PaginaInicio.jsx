import {useState,useEffect} from 'react';
import EventosCercanos from "../componentes/EventosCercanos"
import Testimonio from "../componentes/Testimonio"
import Servicio from "../componentes/Servicio"
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';

import Habitacion from '../componentes/Habitacion'
//import { useAuth } from '../componentes/AuthProvider.jsx';
import axios from 'axios'

function PaginaInicio(){
  const [componentesServicios, setComponentesServicios] = useState([]);
  const [actToggle,setActToggle] = useState(false)
  //const {} = useAuth();

  useEffect(()=>{

    const contextServicios = import.meta.glob('../iconos/servicios/*.jsx');
    const archivosComponentes = Object.keys(contextServicios);
    (async()=>{
      const ServiciosModules = await Promise.all(archivosComponentes.map(file => import(/* @vite-ignore */ file)));
      setComponentesServicios( ServiciosModules.map((mod, index) => {
        const ComponenteIcono = mod.default;
        const nombreComponente = /(?:\/|\\)([^/\\]+)\.(?:[^.]+)?$/.exec(archivosComponentes[index])[1]
        return <Servicio key={nombreComponente} Icono={ComponenteIcono}  />;
      }))
    })()

  },[actToggle])  
 
  const mostrarComponentesServicios=[];
  const piezas=4;
  for(let offset=0; offset<Math.ceil(componentesServicios.length/piezas);offset++ ){
    mostrarComponentesServicios.push((
      <div className="flex flex-col md:flex-row justify-evenly gap-[40px] items-center">
        {componentesServicios.slice(offset*piezas,Math.min((offset*piezas)+piezas,componentesServicios.length))}
      </div>
    ));
  }


  return (
  <>
    <section>
      <h1>Nuestros servicios</h1>
      <Carousel className="w-screen p-[20px] ">
        {mostrarComponentesServicios}
      </Carousel>
    </section>
    <section>
      <h1>Eventos Cercanos</h1>
      <EventosCercanos />
    </section>
    <section>
      <h1>Testimonios</h1>
      <Carousel className=" w-screen p-[20px] ">
        <div className="flex flex-row justify-evenly gap-[40px] flex flex-col md:flex-row">
          <Testimonio titulo="Un refugio de ensueño" autor="Ana M." texto="Pasé una semana inolvidable en Mariposa Dorada. El hotel es un paraíso absoluto, con playas paradisíacas, habitaciones impecables y un servicio impecable. El personal es increíblemente atento y servicial, siempre dispuesto a ayudarme con cualquier necesidad. Me sentí como en casa desde el momento en que llegué. Sin duda, volveré pronto." /> 
          <Testimonio titulo="Experiencia de lujo personalizada" autor="Carlos G." texto="Mariposa Dorada superó con creces mis expectativas. Desde el momento en que llegué, me sentí mimado por el personal, que se aseguró de que mi estadía fuera perfecta. La habitación era espaciosa y lujosa, con vistas impresionantes al mar. Disfruté de las deliciosas opciones gastronómicas y de las actividades al aire libre que ofrece el hotel. Recomiendo encarecidamente este hotel a cualquiera que busque una experiencia de lujo personalizada." /> 
          <Testimonio titulo="Un oasis de tranquilidad" autor="Sofía L." texto="Escapé del ajetreo de la ciudad y encontré mi paz en Mariposa Dorada. El hotel es un oasis de tranquilidad, rodeado de naturaleza exuberante y con un ambiente relajante. Me encantó tomar el sol en la playa, nadar en la piscina y disfrutar de los masajes del spa. El hotel también ofrece una gran variedad de actividades para aquellos que buscan algo más activo. Definitivamente regresaré para otra escapada relajante." /> 
        </div>
        <div className="flex flex-row justify-evenly gap-[40px] flex flex-col md:flex-row">
          <Testimonio titulo="Atención al detalle excepcional" autor="Pedro R." texto="Mariposa Dorada me impresionó con su atención al detalle en todo. Desde la decoración impecable hasta el servicio impecable, todo estaba perfecto. El personal estaba siempre atento a mis necesidades y se esforzaba por hacer que mi estadía fuera lo más agradable posible. Me sentí realmente valorado como huésped. Recomiendo este hotel a cualquiera que busque una experiencia de alojamiento excepcional." /> 
          <Testimonio titulo="Un paraíso para los amantes de la gastronomía" autor="María J." texto="Mariposa Dorada es un paraíso para los amantes de la gastronomía. Disfruté de una gran variedad de platos deliciosos en los restaurantes del hotel, que ofrecen cocina local e internacional. Los chefs son expertos en su oficio y utilizan ingredientes frescos de la más alta calidad. También me encantó la selección de vinos y cócteles. Recomiendo este hotel a cualquiera que busque una experiencia culinaria memorable." /> 
          <Testimonio titulo="Un lugar perfecto para celebrar ocasiones especiales" autor="David A." texto="Celebré mi aniversario de bodas en Mariposa Dorada y fue una experiencia mágica. El hotel organizó una cena romántica a la luz de las velas en la playa, que fue absolutamente perfecta. El personal también me sorprendió con un regalo especial y un delicioso pastel. Me sentí realmente especial y apreciado. Recomiendo este hotel a cualquiera que busque un lugar perfecto para celebrar ocasiones especiales." /> 
        </div>
      </Carousel>
    </section>
    <section>
      <h1>Habitaciones</h1>
        
      <p>Descubre nuestras <Link to="/habitaciones">Habitaciones</Link></p>
      {/*
      <div className="flex flex-row">
      <div className="w-1/2" >
        <Habitacion precio="55" imagen="LuzLuna.png" texto="Transmite tranquilidad y serenidad, ideal para una noche de sueño reparador." titulo="Luz de Luna" />
        <Habitacion precio="75" imagen="LoftMirador.jpeg" texto="Amplio y luminoso, con vistas privilegiadas de la ciudad o el paisaje." titulo="Loft Mirador" />
      </div>
      <div className="w-1/2">
        <Habitacion precio="95" imagen="VentanaHorizonte.jpeg" texto="Ofrece vistas panorámicas impresionantes para una experiencia inolvidable." titulo="Ventana Horizonte" />
        <Habitacion precio="105" imagen="SuiteSuenoDorado.jpeg" texto="Un espacio de ensueño con las más altas comodidades." titulo="Suite sueño Dorado" /> 
      </div>
      </div>*/}
    </section>
  </>)
}

export default PaginaInicio
