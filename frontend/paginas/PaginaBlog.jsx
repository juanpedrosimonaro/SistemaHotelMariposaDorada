import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Link, useOutletContext, useParams } from 'react-router-dom'; 
import { useAuth } from '../componentes/AuthProvider.jsx';
import axios from 'axios';

const Article = () => {
  const {slug} = useParams() 
  const {articlesMeta, setArticlesMeta} = useOutletContext();
  const articleIndex = articlesMeta.findIndex(art=>art.slug==slug);
  const article = articlesMeta[articleIndex];
  const [content, setContent] = useState("");
  const [imagen, setImagen] = useState("");
  const { usuarioData, authToken } = useAuth();

  useEffect(()=>{setContent(article?.content);setImagen(article?.data?.imagen)},[article])

  const handleSubmit = (e)=>{
    e.preventDefault(e);
    const articuloEditado = {
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
    axios.post('/api/articuloMd',articuloEditado,{headers: {"Authorization": `Bearer ${authToken}`}}).then(setArticlesMeta(prevArticles=>[...prevArticles.slice(0,articleIndex), articuloEditado,...prevArticles.slice(articleIndex+1)]));
  }

  return (
      <div className="article m-[20px] flex flex-col items-center ">
        {article != undefined && usuarioData?.rol=="administrador" && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-[40%] gap-[10px] mb-[20px]">
            <h1>Edita este Artículo</h1>
            <label>slug: <input type="text" className="w-[60%]" name="slug" defaultValue={article.slug} placeholder="slug" /> </label>
            {Object.keys(article.data).map(metadata=><label>{metadata}: <input type="text" className="w-[60%]" name={metadata} defaultValue={Array.isArray(article.data[metadata]) ? article.data[metadata].join(", ") : (article.data[metadata] instanceof Date) ?  article.data[metadata].toISOString().split('T')[0] : article.data[metadata] } { ...( metadata == "imagen" && {value:imagen,onChange:(e)=>setImagen(e.target.value)}) } placeholder={metadata} /></label>)}
            <textarea value={content} name="content" onChange={(e)=>setContent(e.target.value)} rows="10" className="w-full" /> 
            <button type="submit" >Actualizar</button>
          </form>
        ) }  
        {article != undefined &&
          <>
            <img src={imagen} className="w-full" alt="Imagen de presentación del artículo" />
            <Markdown className="w-full">{content}</Markdown>
          </>
        }
      </div>
  );
};

export default Article;
