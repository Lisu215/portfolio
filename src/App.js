import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
    <MovieContainer>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <MovieCard>{movie.title}</MovieCard>
        </div>
      ))}
    </MovieContainer>
  );
};

export default App;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const MovieCard = styled.div`
  width: 490px;
  height: 300px;
  margin: 10px;
  background-color: #f5f5f5;
  box-shadow: 0px 0px 10px #000000;
  display: flex;
  text-align: center;
  font-size: 30px;
  align-items: center;
  justify-content: center;
`;
