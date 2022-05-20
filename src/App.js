import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Card,
  Row,
  Navbar,
  FormControl,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import img404 from "./assets/404.png";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [noFound, setNoFound] = useState(false);

  const API_KEY = `fae1f26c794f675b927cfed2a3fd14f0`;
  const BASE_URL = `https://api.themoviedb.org/3`;
  const IMAGE_URL = `https://image.tmdb.org/t/p/w300`;
  const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&sort_by=&include_adult=false&query=${search}&language=ko&page=`;

  useEffect(() => {
    const endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko&page=${page}`;
    fetchApi(endpoint);
  }, []);

  const fetchApi = async (endpoint) => {
    const response = await axios.get(endpoint);
    setMovies([...response.data.results]);
    setTotalPage(response.data.total_pages);
    setLoading(false);
    console.log(response.data.results);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    const endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko&page=${pageNumber}`;
    fetchApi(endpoint);
    window.scrollTo({
      top: 0,
    });
    if (search) {
      const endpoint = `${SEARCH_URL}${pageNumber}`;
      fetchApi(endpoint);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const endpoint = `${SEARCH_URL}${page}`;
    const response = await axios.get(endpoint);
    setMovies([...response.data.results]);
    setTotalPage(response.data.total_pages);
    setLoading(false);
    window.scrollTo({
      top: 0,
    });
    response.data.results.length === 0 ? setNoFound(true) : setNoFound(false);
  };

  return (
    <div className="wrap">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/portfolio" className="brand">
            MovieApp
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="검색"
              className="me-3"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button onClick={handleSearch}>검색</Button>
          </Form>
        </Container>
      </Navbar>

      {noFound === true ? (
        <div className="no-found">
          "{search}"의 검색 결과를 찾을 수 없습니다.
          <img src={img404} alt="notfound" />
        </div>
      ) : (
        <Container>
          <Row className="justify-content-md-center">
            {movies.map((movie) => (
              <Col
                key={movie.id}
                xs={12}
                md={6}
                lg={6}
                xl={6}
                xxl={3}
                style={{
                  padding: 20,
                }}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt={movie.id}
                    style={{
                      height: 350,
                    }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {movie.title
                        ? movie.title.length > 16
                          ? movie.title.substring(0, 16) + "..."
                          : movie.title
                        : "Untitled"}
                    </Card.Title>
                    <Card.Text
                      style={{
                        height: 150,
                      }}
                    >
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
            totalItemsCount={totalPage}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </Container>
      )}
    </div>
  );
};
export default App;

const Button = styled.button`
  width: 80px;
  background: #fff;
  border: 1px solid #ccc;
  margin-right: 10px;
  border-radius: 4px;
  color: #000;
  font-size: 1em;
  font-weight: bold;
  padding: 0.25em 1em;
  cursor: pointer;
  &:hover {
    background: #337ab7;
    color: #fff;
  }
`;
