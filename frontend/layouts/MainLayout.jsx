import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Clima from '../componentes/Clima'

import {motion} from 'framer-motion'// /dist/framer-motion

function MainLayout(){
  return (
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
    >
        <div className="absolute right-[10px] top-[10px]">
          <Clima /> 
        </div>
      <nav className="w-screen bg-cover bg-center relative font-lato flex flex-row justify-evenly items-center gap-[10px]" >
        <div className="flex flex-row gap-[20px] text-[20px] w-[220px] ">
          <Link to="/">Inicio</Link>
          <Link to="/reservaciones">Reservaciones</Link>
        </div>
        <div className="font-playfair text-cl1 flex flex-col items-center">
          <img className="w-[300px]" src="LogoMariposaDorada.png" />
          <span className=" text-[64px] text-center ">Hotel</span>
          <span className=" text-[64px] text-center ">Mariposa Dorada</span>
          <span className="italic">-El paraíso de Paraguaná-</span>
        </div>
        <div className="flex flex-row gap-[20px] text-[20px] w-[220px]">
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blog">Blog</Link>
        </div>
      </nav>
      <main className="p-[50px] flex flex-col items-center">
        <Outlet /> 
      </main>
      <footer className="w-screen h-[100px] bg-black text-white">
        <span className="text-center">¡Que viva Paraguaná!</span>
      </footer>
    </motion.div>
  )
}

export default MainLayout
