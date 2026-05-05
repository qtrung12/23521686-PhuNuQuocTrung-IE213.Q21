import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import MovieDataService from "../services/movies";

function Movie({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    plot: "",
    poster: "",
    reviews: [],
  });

  const [newReview, setNewReview] = useState("");

  const loadMovie = () => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data || { reviews: [] });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    loadMovie();
  }, [id]);

  const handleDelete = (reviewId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    MovieDataService.deleteReview(reviewId, user._id)
      .then(() => loadMovie())
      .catch((e) => console.error(e));
  };

  const handleQuickAddReview = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const payload = {
      movie_id: id,
      review: newReview,
      user_id: user._id,
      name: user.name,
    };

    MovieDataService.createReview(payload)
      .then(() => {
        setNewReview("");
        loadMovie();
      })
      .catch((e) => console.error(e));
  };

  return (
    <Container fluid className="px-0">
      <Row className="g-4">
        <Col xs={12} lg={5}>
          {movie.poster && <Image src={movie.poster} alt={movie.title} fluid rounded className="shadow-sm" />}
        </Col>
        <Col xs={12} lg={7}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h4">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>{movie.plot}</Card.Text>
              {user && (
                <Link to={`/movies/${id}/review`} className="btn btn-success btn-sm">
                  Add Review
                </Link>
              )}
            </Card.Body>
          </Card>

          {user && (
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className="h5">Quick Review</Card.Title>
                <Form onSubmit={handleQuickAddReview}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write a review"
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" size="sm">
                    Submit Review
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          <h3 className="mb-3">Reviews</h3>
          {movie.reviews && movie.reviews.length > 0 ? (
            movie.reviews.map((review) => (
              <Card key={review._id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    {review.name} reviewed on {moment(review.date).format("Do MMMM YYYY")}
                  </Card.Subtitle>
                  <Card.Text>{review.review}</Card.Text>
                  {user && user._id === review.user_id && (
                    <Row className="g-2">
                      <Col xs="auto">
                        <Link
                          className="btn btn-outline-secondary btn-sm"
                          to={`/movies/${id}/review`}
                          state={{ currentReview: review }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(review._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Movie;
