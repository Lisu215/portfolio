import React from "react";
import { Col, Container, Card, Row } from "react-bootstrap";
import { IMAGE_URL } from "../../api/MovieApi";
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  return (
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/detail/${movie.id}`);
                  window.scrollTo(0, 0);
                }}
              />

              <Card.Body>
                <Card.Title>
                  {movie.title
                    ? movie.title.length > 13
                      ? movie.title.substring(0, 13) + "..."
                      : movie.title
                    : movie.name}
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
    </Container>
  );
};

export default MovieList;
