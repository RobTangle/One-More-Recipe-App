import React, { useState } from "react";
import styles from "./paginacion.css";

export const Paginacion = ({ page, setPage, maxPages }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maxPages) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="paginacion">
      <button disabled={page === 1 || page < 1} onClick={previousPage}>
        <svg viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.2853 26.5151C19.0696 26.6273 18.8274 26.6786 18.5848 26.6636C18.3421 26.6485 18.1081 26.5677 17.9079 26.4297L0.574034 14.4294C0.396911 14.3066 0.252166 14.1428 0.152193 13.9519C0.0522204 13.7611 0 13.5488 0 13.3333C0 13.1178 0.0522204 12.9056 0.152193 12.7147C0.252166 12.5238 0.396911 12.36 0.574034 12.2373L17.9079 0.236891C18.108 0.0984771 18.3421 0.0174242 18.5849 0.0025091C18.8277 -0.012406 19.0699 0.039385 19.2854 0.152274C19.5009 0.265163 19.6814 0.434849 19.8073 0.642958C19.9333 0.851067 19.9999 1.08967 20 1.33293V25.3337C20 25.5771 19.9335 25.8159 19.8075 26.0241C19.6815 26.2324 19.5009 26.4021 19.2853 26.5151Z"
            fill="white"
          />
        </svg>
      </button>
      <input
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p> de {Math.ceil(maxPages)} </p>
      <button
        disabled={page === Math.ceil(maxPages) || page > Math.ceil(maxPages)}
        onClick={nextPage}
      >
        next page
      </button>
    </div>
  );
};
