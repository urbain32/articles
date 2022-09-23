import React from "react";
import { Link } from "react-router-dom";
import './PageNotFound.css'
export default function PageNotFound() {
  return (
    <div id='notfound'>
      <div class='notfound'>
        <div class='notfound-404'>
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <br />
        <Link to='/'>Homepage</Link>
      </div>
    </div>
  );
}
