import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Create from "./Create";
// Styles
import "./Home.css";
export default function Home() {
  const { data, isPending, error } = useFetch(
    " http://localhost:3002/articles"
  );
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/articles/${id}`).then(() => {
      console.log("Data delete");
    });
  };
  return (
    <div className="home">
      <h2>Articles</h2>
      <div className="create">
        <Create />
      </div>
      {error && <div> {error}</div>}
      {isPending && <div> Loading...</div>}
      {data &&
        data.map((article) => (
          <div className="card" key={article.id}>
            <div className="delete">
              <Delete onClick={() => handleDelete(article.id)} />
            </div>
            <h3>{article.title}</h3>
            <p>written by {article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more ...</Link>
          </div>
        ))}
    </div>
  );
}
