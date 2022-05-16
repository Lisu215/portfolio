import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Card, Row } from "react-bootstrap";
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
    <Container>
      <Row className="justify-content-md-center">
        {movies.map((movie, index) => (
          <Col key={movie.id} xs={12} md={3} style={{padding:20}}>
            <Card>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.id} style={{height:350}} />
              <Card.Body>
                <Card.Title>
                  {movie.original_title ? movie.original_title.length > 20 ? movie.original_title.substring(0,20) + '...' : movie.original_title : 'Untitled'}
                </Card.Title>
                <Card.Text style={{height:150}}>
                  {movie.overview.length > 180 ? movie.overview.substring(0,180) + '...' : movie.overview}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;

// const MovieContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   margin: 0 auto;
// `;

// const MovieCard = styled.div`
//   width: 285px;
//   height: 300px;
//   margin: 10px;
//   background-color: #f5f5f5;
//   box-shadow: 0px 0px 10px #000000;
//   display: flex;
//   text-align: center;
//   font-size: 30px;
//   align-items: center;
//   justify-content: center;
// `;
