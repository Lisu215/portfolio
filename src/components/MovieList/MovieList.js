import React from "react";
import { Col, Container, Card, Row } from "react-bootstrap";
import { IMAGE_URL } from "../../api/MovieApi";

const MovieList = ({ movies }) => {
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
    </Container>
  );
};

export default MovieList;
