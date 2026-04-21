import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3000/api/v1/movies";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) {
          throw new Error("Cannot fetch movies from backend");
        }

        const data = await response.json();
        const list = Array.isArray(data) ? data : data.movies || [];
        setMovies(list.slice(0, 9));
      } catch (e) {
        // Fallback sample data helps keep the UI demonstrable when backend is off.
        setMovies([
          { _id: "demo-1", title: "The Shawshank Redemption", year: 1994, rated: "R", plot: "Two imprisoned men bond over years." },
          { _id: "demo-2", title: "The Godfather", year: 1972, rated: "R", plot: "The aging patriarch transfers control." },
          { _id: "demo-3", title: "The Dark Knight", year: 2008, rated: "PG-13", plot: "Batman faces the Joker in Gotham." }
        ]);
        setError("Backend chưa chạy, đang hiển thị dữ liệu mẫu.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading movies list...</p>;
  }

  return (
    <div>
      <h2 className="mb-3">Movies List</h2>
      {error && <div className="alert alert-warning py-2">{error}</div>}
      <div className="row g-3">
        {movies.map((movie) => (
          <div className="col-12 col-md-6 col-lg-4" key={movie._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <div className="mb-2 text-muted">{movie.year || "N/A"} | {movie.rated || "N/A"}</div>
                <p className="card-text">{movie.plot || "No plot available."}</p>
                <Link to={`/movies/${movie._id}`} className="btn btn-primary btn-sm">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
