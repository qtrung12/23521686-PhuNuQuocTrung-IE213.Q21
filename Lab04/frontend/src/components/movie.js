import React from "react";
import { Link, useParams } from "react-router-dom";

function Movie({ user }) {
  const { id } = useParams();

  return (
    <div>
      <h2>Movie Detail</h2>
      <p className="text-muted mb-2">Movie id: {id}</p>
      <p>Trang chi tiết phim và reviews sẽ được mở rộng ở lab sau.</p>
      <p>
        Trạng thái user: <strong>{user ? `Logged in as ${user}` : "Not logged in"}</strong>
      </p>
      <Link to={`/movies/${id}/review`} className="btn btn-success btn-sm">Add Review</Link>
    </div>
  );
}

export default Movie;
