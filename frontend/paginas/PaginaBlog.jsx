import Markdown from 'react-markdown';
import { Link, useOutletContext, useParams } from 'react-router-dom'; // Importa React Router

const Article = () => {
  /*const [articleText, setArticleText] = useState('');
  const [metadata, setMetadata] = useState({}); // Estado para almacenar los metadatos

  useEffect(() => {
    fetch(articleContent)
      .then((response) => response.text())
      .then((text) => {
        setArticleText(text);
        const parsedMetadata = matter(text).data; // Extrae los metadatos
        setMetadata(parsedMetadata);
      });
  }, []);*/
  const {slug} = useParams()
  const articlesMeta = useOutletContext();
  console.log(articlesMeta);
  const article = articlesMeta.find(art=>art.slug==slug)

  return (
    <div className="article">
      <img src={article.data.imagen} alt="Imagen de presentación" />
      <Markdown>{article.content}</Markdown>
    </div>
  );
};

export default Article
