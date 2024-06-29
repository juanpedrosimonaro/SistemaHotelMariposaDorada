import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom'; // Importa React Router

const ArticleList = () => {

  const articlesMeta = useOutletContext();

  return (
    <div className="article-list">
      {articlesMeta.map((meta) => (
        <div key={meta.slug}>
          <img src={meta.data.imagen} />
          <h2 className="bold">{meta.data.titulo}</h2>
          <p>{meta.data.descripcion}</p>
          <p>Escrito por: {meta.data.autor}</p>
          <Link to={`/blog/${meta.slug}`}>Leer más</Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
