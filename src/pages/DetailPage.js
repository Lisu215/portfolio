import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL, IMAGE_URL } from "./../api/MovieApi";
import { useParams } from "react-router-dom";
import "./DetailPage.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Rating from "@mui/material/Rating";

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
      .then((data) => {
        const cast = data.cast.slice(0, 9);
        setCast(cast);
      });

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
        <FaLongArrowAltLeft
          className="detail-back"
          onClick={() => (window.location.href = "/portfolio")}
        />
        <div className="detail-top">
          <div className="detail-info">
            <div className="detail-title">{movies.title}</div>
            <div className="detail-tagline">{movies.tagline}</div>
          </div>

          <div className="detail-rate">
            <h2 style={{ fontWeight: "bold", textAlign: "center" }}>평점</h2>
            <Rating
              name="read-only"
              value={movies.vote_average / 2}
              readOnly
              style={{ fontSize: "3rem" }}
            />
          </div>
        </div>

        <div className="hr" />

        <div className="detail-img-trailer">
          <img
            className="detail-img"
            src={`${IMAGE_URL}${movies.poster_path}`}
            alt={movies.title}
          />

          <iframe
            className="detail-trailer"
            title={movies.title}
            width="850"
            height="550"
            src={`https://www.youtube.com/embed/${Trailer}?autoplay=1`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            allowfullscreen
          />
        </div>

        <div className="hr" />

        <div className="detail-overview">
          <h3>줄거리</h3>
          <p>{movies.overview}</p>

          <div className="hr" />

          <div className="detail-release">
            <h3>개봉일</h3>
            <p>{movies.release_date}</p>
          </div>

          <div className="hr" />

          <div className="detail-genre">
            <h3>장르</h3>
            <p>
              {movies.genres &&
                movies.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>

          <div className="hr" />

          <div className="detail-runnigtime">
            <h3>상영시간</h3>
            <p>{movies.runtime}분</p>
          </div>

          <div className="hr" />

          <h3>출연진</h3>
          <div className="detail-cast">
            {cast &&
              cast.map((cast) => (
                <div className="detail-cast-item" key={cast.id}>
                  {cast.profile_path ? (
                    <img
                      className="detail-cast-img"
                      src={`${IMAGE_URL}${cast.profile_path}`}
                      alt={cast.name}
                    />
                  ) : (
                    <img
                      className="detail-no-img"
                      src={require("./../assets/no_image.png")}
                      alt="no_image"
                    />
                  )}
                  <div className="detail-cast-name">
                    <h3>{cast.name}</h3>

                    <div className="detail-character">{cast.character} 역</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
