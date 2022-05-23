import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "./api/MovieApi";
import PageNation from "./components/PageNation/PageNation";
import MovieList from "./components/MovieList/MovieList";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NavBar/NotFound";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [noFound, setNoFound] = useState(false);

  const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&sort_by=&include_adult=false&query=${search}&language=ko&page=`;

  useEffect(() => {
    const endpoint = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=ko&page=${page}`;
    fetchApi(endpoint);
  }, [page]);

  const fetchApi = async (endpoint) => {
    const response = await axios.get(endpoint);
    setMovies([...response.data.results]);
    setTotalPage(response.data.total_pages);
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
    window.scrollTo({
      top: 0,
    });
    response.data.results.length === 0 ? setNoFound(true) : setNoFound(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="wrap">
      <NavBar search={search} handleSearch={handleSearch} onSearch={onSearch} />
      {noFound === true ? (
        <NotFound search={search} />
      ) : (
        <MovieList movies={movies} />
      )}
      <PageNation
        page={page}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
export default App;
