import React from "react";
import { useLocation } from "react-router";

export default function Contact() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString)
  const name = queryParams.get('name')
  
  return (
    <div>
      <h2>Hey {name},Contact us here</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ut
        saepe, praesentium voluptatibus qui sint id dignissimos dolorum
        quibusdam placeat eos molestias aspernatur at, quis itaque quod illum
        inventore eum.
      </p>
    </div>
  );
}
