import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = `fae1f26c794f675b927cfed2a3fd14f0`;
  const BASE_URL = `https://api.themoviedb.org/3`;
  const Trend = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const response = await axios.get(Trend);
    setMovies(response.data.results);
    setLoading(false);
    console.log(response.data.results);
  };

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
      ))}
    </div>
  );
};

export default App;
