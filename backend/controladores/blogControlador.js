const { promises: fsp } = require('fs');

const guardarArticulo = async (req, res) => {
  const { data, content, slug } = req.body; // Datos y contenido enviados desde el cliente

  console.log(req.body);
  // Crear el contenido del archivo .md con formato YAML
  const yamlHeader = `---
autor: ${data.autor}
fecha: ${data.fecha}
titulo: ${data.titulo}
categorias: [${data.categorias}]
imagen: ${data.imagen}
descripcion: "${data.descripcion}"
---
${content}`;

  // Guardar el archivo .md con el nombre especificado en datos.slug
  const filePath = `./frontend/articulos/${slug}.md`;
  await fsp.writeFile(filePath, yamlHeader);

  res.status(200).json({ message: `Archivo ${slug}.md fue guardado correctamente.` });
};

const eliminarArticulo = async (req, res) => {
  const filePath = `./frontend/articulos/${req.params.slug}.md`;
  await fsp.unlink(filePath);
  res.status(200).json({ message: `Archivo ${req.params.slug}.md fue eliminado correctamente.` });
}

module.exports = {
  guardarArticulo,
  eliminarArticulo,
}
