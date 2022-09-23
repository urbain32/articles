
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
// Styles
import './Home.css'
export default function Home() {
  const { data, isPending, error } = useFetch(
    ' http://localhost:3002/articles'
  );
  return (
    <div className="home">
      <h2>Articles</h2>
      {error && <div> {error}</div>}
      {isPending && <div> Loading...</div>}
      {data &&
        data.map((article) => (
          <div className='card' key={article.id}>
            <h3>{article.title}</h3>
            <p>written by {article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more ...</Link>
          </div>
        ))}
    </div>
  );
}
