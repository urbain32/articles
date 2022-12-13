import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Create from "./Create";
import Edite from "./Edit";
// Styles
import "./Home.css";
export default function Home() {
  // const { data, isPending, error } = useFetch(
  //   " http://localhost:3002/articles"
  // );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Ajouter");
  const [currentBank, setCurrentBank] = useState({
    title: "",
    author: "",
    body: "",
  });
  const setCurrent = (event, row) => {
    setCurrentBank({
      id: row.id,
      title: row.title,
      author: row.author,
      body: row.body,
    });
    setTitle("Modifier");
  };
  const url = "http://localhost:3002/articles";
  const loadData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        // console.log('data', res.data);
      })
      .catch((err) => {
        console.log("error message", err.message);
        setLoading(false);
      });
    setCurrentBank({
      title: "",
      author: "",
      body: "",
    });
    setTitle("Ajouter");
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/articles/${id}`).then(() => {
      console.log("Data delete");
      loadData();
    });
  };
  return (
    <div className="home">
      <h2>Articles</h2>
      <div className="create">
        <Create
          data={data}
          handleDelete={handleDelete}
          title={title}
          setTitle={setTitle}
          currentBank={currentBank}
          loadData={loadData}
        />
      </div>
      {/* {error && <div> {error}</div>}
      {isPending && <div> Loading...</div>} */}
      {data &&
        data.map((article) => (
          <div className="card" key={article.id}>
            <div className="delete">
              <Delete onClick={() => handleDelete(article.id)} />
            </div>
            <h3>{article.title}</h3>
            <p>written by {article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more ...</Link>
            <div className="delete">
              <Edite
                article={article.id}
                currentBank={currentBank}
                loadData={loadData}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
