import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MovieDataService from "../services/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("All Ratings");
  const [ratings, setRatings] = useState(["All Ratings"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = () => {
    setLoading(true);
    MovieDataService.getAll()
      .then((response) => {
        setMovies(response.data.movies || []);
        setError("");
      })
      .catch((e) => {
        setError("Không thể tải danh sách phim.");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        setRatings(["All Ratings", ...(response.data || [])]);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const find = (query, by) => {
    setLoading(true);
    MovieDataService.find(query, by)
      .then((response) => {
        setMovies(response.data.movies || []);
        setError("");
      })
      .catch((e) => {
        setError("Không tìm thấy dữ liệu phù hợp.");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const findByTitle = () => {
    if (searchTitle.trim()) {
      find(searchTitle.trim(), "title");
    } else {
      retrieveMovies();
    }
  };

  const findByRating = () => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={findByTitle}>
            Search
          </Button>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-2">
            <Form.Select
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
            >
              {ratings.map((rating, index) => (
                <option key={index} value={rating}>
                  {rating}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={findByRating}>
            Search
          </Button>
        </Col>
      </Row>

      {error && <div className="alert alert-warning">{error}</div>}
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <Row className="g-4">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm movie-card">
                {movie.poster && (
                  <Card.Img variant="top" src={movie.poster} alt={movie.title} />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    Rating: {movie.rated || "N/A"}
                  </Card.Text>
                  <Card.Text className="flex-grow-1">{movie.plot}</Card.Text>
                  <Link className="btn btn-outline-primary btn-sm mt-auto" to={`/movies/${movie._id}`}>
                    View Reviews
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default MoviesList;
