import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from '../hooks/useFetch'
export default function Articles() {
    const { id } = useParams()
    const url = `http://localhost:3002/articles/` + id;
    const { data: article, error, isPending } = useFetch(url);
    const history = useHistory();
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                history.push('/')
            }, 2000);
        }
    },[error,history])
    return (
      <div>
        {error && <div> {error}</div>}
        {isPending && <div> Loading...</div>}
        {article && (
          <div>
            <h2>{article.title}</h2>
            <p>By {article.author}</p>
            <p>{article.body}</p>
          </div>
        )}
      </div>
    );
}
