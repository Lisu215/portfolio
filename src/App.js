import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Card, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState();

  const API_KEY = `fae1f26c794f675b927cfed2a3fd14f0`;
  const BASE_URL = `https://api.themoviedb.org/3`;
  const IMAGE_URL = `https://image.tmdb.org/t/p/w300`;

  useEffect(() => {
    const endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko&page=${page}`;
    fetchApi(endpoint);
  }, []);

  const fetchApi = async (endpoint) => {
    const response = await axios.get(endpoint);
    setMovies([...response.data.results]);
    setLoading(false);
    console.log(response.data.results);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    const endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko&page=${pageNumber}`;
    fetchApi(endpoint);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="wrap">
      <Container>
        <Row className="justify-content-md-center">
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} md={3} style={{ padding: 20 }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${IMAGE_URL}${movie.poster_path}`}
                  alt={movie.id}
                  style={{ height: 350 }}
                />
                <Card.Body>
                  <Card.Title>
                    {movie.title
                      ? movie.title.length > 20
                        ? movie.title.substring(0, 20) + "..."
                        : movie.title
                      : "Untitled"}
                  </Card.Title>
                  <Card.Text style={{ height: 150 }}>
                    {movie.overview.length > 130
                      ? movie.overview.substring(0, 130) + "..."
                      : movie.overview}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          activePage={page}
          totalItemsCount={200}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </Container>
    </div>
  );
};
export default App;
