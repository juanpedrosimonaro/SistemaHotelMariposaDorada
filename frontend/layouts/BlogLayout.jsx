import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios'
import matter from 'gray-matter'; // Importa gray-matter
import {motion} from 'framer-motion'// /dist/framer-motion

function BlogLayout({children}){

  const [articlesMeta, setArticlesMeta] = useState([]);

  useEffect(() => {
    // Lee todos los archivos .md (ajusta la ruta según tu estructura)
    const context = import.meta.glob('../articulos/*.md'); //require.context('../articulos', false, /\.md$/);
    const articleFiles = Object.keys(context);
    //console.log(articleFiles)
    (async()=>{
      const allModules = await Promise.all(articleFiles.map(file=>context[file]())) 
      const metadata = (await Promise.all(allModules.map(mod=>axios(mod.default)))).map(res=>({...matter(res.data),url:res.request.responseURL,slug:(/\/([^/]+)\.[^/]*$/.exec(res.request.responseURL)[1])})).filter(meta=>Object.keys(meta.data).length!=0)
      setArticlesMeta(metadata)
      console.log("Metadata from layout: ", metadata)
      //console.log(allFiles)
    })()
  },[])
    

  return (
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
    >
      <nav className="w-screen md:h-[100px] text-white bg-black flex flex-col md:flex-row justify-center items-center relative" >
          <div className="font-playfair text-[35px] text-cl1 text-center">
            Mariposa Dorada
          </div>
          <span className="font-lato ml-[20px] text-[30px]">Blog</span>
        <Link to="/" className="md:absolute md:right-[20px]">Pagina Principal</Link>
      </nav>
      <main>
        <Outlet context={{articlesMeta,setArticlesMeta}} /> 
      </main>
    </motion.div>
  )
}

export default BlogLayout
