import {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlogLayout from '../layouts/BlogLayout';
import PaginaInicio from '../paginas/PaginaInicio';
//import PaginaReservacion from '../paginas/PaginaReservacion';
import PaginaNosotros from '../paginas/PaginaNosotros';
import PaginaBlogs from '../paginas/PaginaBlogs';
import PaginaBlog from '../paginas/PaginaBlog';
import PaginaIngreso from '../paginas/PaginaIngreso';
import PaginaRegistro from '../paginas/PaginaRegistro';
import PaginaHabitaciones from '../paginas/PaginaHabitaciones';
import PaginaHabitacion from '../paginas/PaginaHabitacion';
import { AuthProvider, useAuth } from './AuthProvider';

import {AnimatePresence} from 'framer-motion'// /dist/framer-motion

const AnimatedRoutes = ()=>{
  const location = useLocation();
  return(
    <AnimatePresence >
      <AuthProvider>
        <Routes location={location} key={location.pathname}> 
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PaginaInicio />} />
            {/*<Route path="reservaciones" element={<PaginaReservacion />} />*/}
            <Route path="ingresar" element={<PaginaIngreso />} />
            <Route path="registro" element={<PaginaRegistro />} />
            <Route path="habitaciones" element={<PaginaHabitaciones />} />
            <Route path="habitacion/:slug" element={<PaginaHabitacion />} />
            <Route path="nosotros" element={<PaginaNosotros />} />
          </Route>
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<PaginaBlogs />} />
            <Route path=":slug" element={<PaginaBlog />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </AnimatePresence >
  )
}

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() =>{
    logout()
  },[logout]);
  return <Navigate to="/" />
}

export default AnimatedRoutes
