import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Link, useOutletContext, useParams } from 'react-router-dom'; // Importa React Router
import { useAuth } from '../componentes/AuthProvider.jsx';
import axios from 'axios';

const ArticleList = () => {

  const {articlesMeta,setArticlesMeta} = useOutletContext();
  const {slug} = useParams() 
  const [content, setContent] = useState("")
  const [imagen, setImagen] = useState("")
  const { usuarioData, authToken } = useAuth();

  const handleSubmit = (e)=>{
    e.preventDefault(e);
    const articuloNuevo = {
      data:{
        autor:e.target.autor.value,
        fecha:e.target.fecha.value,
        titulo:e.target.titulo.value,
        categorias:e.target.categorias.value,
        imagen:e.target.imagen.value,
        descripcion:e.target.descripcion.value
      },
      content:e.target.content.value,
      slug:e.target.slug.value,
    }
    debugger;
    axios.post('/api/articuloMd',articuloNuevo,{headers: {"Authorization": `Bearer ${authToken}`}}).then(()=>{
      setArticlesMeta(prevArticles=>[...prevArticles,articuloNuevo]);
      e.target.autor.value="";
      e.target.fecha.value="";
      e.target.titulo.value="";
      e.target.categorias.value="";
      e.target.imagen.value="";
      e.target.descripcion.value="";
      e.target.slug.value="";
      e.target.content.value="";
    });
  }

  const handleEliminarArticulo = (index)=>{
    axios.delete(`/api/articuloMd/${articlesMeta[index].slug}`,{headers: {"Authorization": `Bearer ${authToken}`}}).then(()=>{
      setArticlesMeta(prevArticles=>[...prevArticles.slice(0,index),...prevArticles.slice(index+1)])
    })
  }

  return (
    <div className="article-list flex flex-col items-center">
      {usuarioData?.rol=="administrador" && (
        <>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <h1>Crear nuevo artículo</h1>
              <label>slug: <input type="text" name="slug" placeholder="slug" /></label>
              <label>autor: <input type="text" name="autor" placeholder="autor" /></label>
              <label>fecha: <input type="text" name="fecha" placeholder="fecha" /></label>
              <label>titulo: <input type="text" name="titulo" placeholder="titulo" /></label>
              <label>categorias: <input type="text" name="categorias" placeholder="categorias" /></label>
              <label>imagen: <input type="text" name="imagen" value={imagen} onChange={(e)=>setImagen(e.target.value)} placeholder="imagen" /></label>
              <label>descripcion: <input type="text" name="descripcion" placeholder="descripcion" /></label>
              <textarea value={content} name="content" onChange={(e)=>setContent(e.target.value)} rows="10" className="w-full" /> 
              <button type="submit" >Crear</button>
            </form>
            <img src={imagen} alt="Imagen nuevo articulo" />
            <Markdown>{content}</Markdown>
          </div>
          <h1>Artículos: </h1>
        </>
      )}
      {articlesMeta.map((meta,index) => (
        <div key={meta.slug} className="w-[80%]  m-[20px]">
          <img className="w-full" src={meta.data.imagen} />
          <h2 className="font-bold">{meta.data.titulo}</h2>
          <p>{meta.data.descripcion}</p>
          <p>Escrito por: {meta.data.autor}</p>
          <Link to={`/blog/${meta.slug}`}>Leer más</Link>
          {usuarioData?.rol=="administrador" && <button onClick={()=>handleEliminarArticulo(index)}>Eliminar</button>}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
