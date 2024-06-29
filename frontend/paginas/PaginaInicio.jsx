import EventosCercanos from "../componentes/EventosCercanos"
import Testimonio from "../componentes/Testimonio"
import Servicio from "../componentes/Servicio"
import Carousel from 'react-material-ui-carousel'
import HotelRoom from '../iconos/HotelRoom'
import RoomService from '../iconos/RoomService'
import Events from '../iconos/Events'
import Restaurant from '../iconos/Restaurant'
import Pool from '../iconos/Pool'
import Gym from '../iconos/Gym'
import Wifi from '../iconos/Wifi'
import Coworking from '../iconos/Coworking'
import Habitacion from '../componentes/Habitacion'

function PaginaInicio(){
  return (
  <>
    <section>
      <h1>Nuestros servicios</h1>
      <Carousel className="h-[500px] w-screen p-[20px]">
        <div className="flex flex-row justify-evenly gap-[40px] items-center" >
          <Servicio icono={<HotelRoom />} texto="Hospedaje" />
          <Servicio icono={<RoomService />} texto="Servicio al Cuarto" />
          <Servicio icono={<Events />} texto="Celebraciones y Eventos" />
          <Servicio icono={<Restaurant />} texto="El mejor Restaurant" />
        </div>
        <div className="flex flex-row justify-evenly gap-[40px] items-center" >
          <Servicio icono={<Pool />} texto="Piscina" />
          <Servicio icono={<Gym />} texto="Gimnasio" />
          <Servicio icono={<Wifi />} texto="Internet inalámbrico" />
          <Servicio icono={<Coworking />} texto="Ambiente de Trabajo" />
        </div>
      </Carousel>
    </section>
    <section>
      <h1>Eventos Cercanos</h1>
      <EventosCercanos />
    </section>
    <section>
      <h1>Testimonios</h1>
      <Carousel className=" w-screen p-[20px]">
        <div className="flex flex-row justify-evenly gap-[40px]">
          <Testimonio titulo="Un refugio de ensueño" autor="Ana M." texto="Pasé una semana inolvidable en Mariposa Dorada. El hotel es un paraíso absoluto, con playas paradisíacas, habitaciones impecables y un servicio impecable. El personal es increíblemente atento y servicial, siempre dispuesto a ayudarme con cualquier necesidad. Me sentí como en casa desde el momento en que llegué. Sin duda, volveré pronto." /> 
          <Testimonio titulo="Experiencia de lujo personalizada" autor="Carlos G." texto="Mariposa Dorada superó con creces mis expectativas. Desde el momento en que llegué, me sentí mimado por el personal, que se aseguró de que mi estadía fuera perfecta. La habitación era espaciosa y lujosa, con vistas impresionantes al mar. Disfruté de las deliciosas opciones gastronómicas y de las actividades al aire libre que ofrece el hotel. Recomiendo encarecidamente este hotel a cualquiera que busque una experiencia de lujo personalizada." /> 
          <Testimonio titulo="Un oasis de tranquilidad" autor="Sofía L." texto="Escapé del ajetreo de la ciudad y encontré mi paz en Mariposa Dorada. El hotel es un oasis de tranquilidad, rodeado de naturaleza exuberante y con un ambiente relajante. Me encantó tomar el sol en la playa, nadar en la piscina y disfrutar de los masajes del spa. El hotel también ofrece una gran variedad de actividades para aquellos que buscan algo más activo. Definitivamente regresaré para otra escapada relajante." /> 
        </div>
        <div className="flex flex-row justify-evenly gap-[40px]">
          <Testimonio titulo="Atención al detalle excepcional" autor="Pedro R." texto="Mariposa Dorada me impresionó con su atención al detalle en todo. Desde la decoración impecable hasta el servicio impecable, todo estaba perfecto. El personal estaba siempre atento a mis necesidades y se esforzaba por hacer que mi estadía fuera lo más agradable posible. Me sentí realmente valorado como huésped. Recomiendo este hotel a cualquiera que busque una experiencia de alojamiento excepcional." /> 
          <Testimonio titulo="Un paraíso para los amantes de la gastronomía" autor="María J." texto="Mariposa Dorada es un paraíso para los amantes de la gastronomía. Disfruté de una gran variedad de platos deliciosos en los restaurantes del hotel, que ofrecen cocina local e internacional. Los chefs son expertos en su oficio y utilizan ingredientes frescos de la más alta calidad. También me encantó la selección de vinos y cócteles. Recomiendo este hotel a cualquiera que busque una experiencia culinaria memorable." /> 
          <Testimonio titulo="Un lugar perfecto para celebrar ocasiones especiales" autor="David A." texto="Celebré mi aniversario de bodas en Mariposa Dorada y fue una experiencia mágica. El hotel organizó una cena romántica a la luz de las velas en la playa, que fue absolutamente perfecta. El personal también me sorprendió con un regalo especial y un delicioso pastel. Me sentí realmente especial y apreciado. Recomiendo este hotel a cualquiera que busque un lugar perfecto para celebrar ocasiones especiales." /> 
        </div>
      </Carousel>
    </section>
    <section>
      <h1>Habitaciones</h1>
      <div className="flex flex-row">
      <div className="w-1/2" >
        <Habitacion precio="55" imagen="LuzLuna.png" texto="Transmite tranquilidad y serenidad, ideal para una noche de sueño reparador." titulo="Luz de Luna" />
        <Habitacion precio="75" imagen="LoftMirador.jpeg" texto="Amplio y luminoso, con vistas privilegiadas de la ciudad o el paisaje." titulo="Loft Mirador" />
      </div>
      <div className="w-1/2">
        <Habitacion precio="95" imagen="VentanaHorizonte.jpeg" texto="Ofrece vistas panorámicas impresionantes para una experiencia inolvidable." titulo="Ventana Horizonte" />
        <Habitacion precio="105" imagen="SuiteSuenoDorado.jpeg" texto="Un espacio de ensueño con las más altas comodidades." titulo="Suite sueño Dorado" />
      </div>
      </div>
    </section>
  </>)
}

export default PaginaInicio
