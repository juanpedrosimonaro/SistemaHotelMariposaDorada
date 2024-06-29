import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlogLayout from '../layouts/BlogLayout';
import PaginaInicio from '../paginas/PaginaInicio';
import PaginaReservacion from '../paginas/PaginaReservacion';
import PaginaNosotros from '../paginas/PaginaNosotros';
import PaginaBlogs from '../paginas/PaginaBlogs';
import PaginaBlog from '../paginas/PaginaBlog';

import {AnimatePresence} from 'framer-motion'// /dist/framer-motion

const AnimatedRoutes = ()=>{
  const location = useLocation();
  return(
    <AnimatePresence >
    <Routes location={location} key={location.pathname}> 
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PaginaInicio />} />
        <Route path="reservaciones" element={<PaginaReservacion />} />
        <Route path="nosotros" element={<PaginaNosotros />} />
      </Route>
      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<PaginaBlogs />} />
        <Route path="/blog/:slug" element={<PaginaBlog />} />
      </Route>
    </Routes>
    </AnimatePresence >
  )
}

export default AnimatedRoutes
