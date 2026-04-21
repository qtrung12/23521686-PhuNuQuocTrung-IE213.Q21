import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddReview({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add a review.");
      navigate("/login");
      return;
    }

    alert(`Review submitted for movie ${id}: ${review}`);
    navigate(`/movies/${id}`);
  }

  return (
    <div>
      <h2>Add Review</h2>
      <p className="text-muted">Movie id: {id}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea
            className="form-control"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Submit Review</button>
      </form>
    </div>
  );
}

export default AddReview;
