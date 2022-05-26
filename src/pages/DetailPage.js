import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMAGE_URL } from "./../api/MovieApi";
import { useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const movieId = useParams().id;
  const [movies, setMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [Trailer, setTrailer] = useState([]);

  useEffect(() => {
    const movieinfo = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    const moviecast = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const movietrailer = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`;

    fetch(movieinfo)
      .then((response) => response.json())
      .then((data) => setMovies(data));

    fetch(moviecast)
      .then((response) => response.json())
      .then((data) => setCast(data));

    fetch(movietrailer)
      .then((response) => response.json())
      .then((data) => {
        const vedioKey = data.results.filter(
          (item) => item.type === "Trailer" || item.type === "Teaser"
        )[0].key;
        setTrailer(vedioKey);
      });
  }, [movieId]);

  return (
    <div className="detail-container">
      <div className="detail-main">
        <div className="detail-title">
          <h1>{movies.title}</h1>
          <h2>{movies.tagline}</h2>
        </div>
        <div className="detail-rate">
          <h3>평점</h3>
          <h4>{movies.vote_average} / 10</h4>
        </div>
        <div>
          <img
            className="detail-img"
            src={`${IMAGE_URL}${movies.poster_path}`}
            alt={movies.title}
          />
        </div>
        <iframe
          className="detail-trailer"
          title={movies.title}
          width="900"
          height="550"
          src={`https://www.youtube.com/embed/${Trailer}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameborder="0"
          allowfullscreen
        />
        <div className="detail-overview">
          <h3>줄거리</h3>
          <p>{movies.overview}</p>

          <h3>출연진</h3>
          <img className="detail-cast-img" />
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
