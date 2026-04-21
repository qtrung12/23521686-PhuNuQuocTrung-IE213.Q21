import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(username || "guest");
    navigate("/movies");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Login</button>
      </form>
    </div>
  );
}

export default Login;
