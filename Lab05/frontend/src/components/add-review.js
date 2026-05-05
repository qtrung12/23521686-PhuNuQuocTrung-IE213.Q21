import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MovieDataService from "../services/movies";

function AddReview({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentReview = location.state?.currentReview || null;
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (currentReview) {
      setReview(currentReview.review || "");
    }
  }, [user, currentReview, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const payload = {
      movie_id: id,
      review,
      user_id: user._id,
      name: user.name,
    };

    const action = currentReview
      ? MovieDataService.updateReview({
          review_id: currentReview._id,
          review,
          user_id: user._id,
        })
      : MovieDataService.createReview(payload);

    action
      .then(() => {
        navigate(`/movies/${id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{currentReview ? "Edit Review" : "Add Review"}</Card.Title>
        <Card.Text className="text-muted">Movie id: {id}</Card.Text>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            {currentReview ? "Update Review" : "Submit Review"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddReview;
