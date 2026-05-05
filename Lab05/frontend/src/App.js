import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import AddReview from "./components/add-review";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(() => {
    try {
      const savedUser = localStorage.getItem("movieReviewsUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  function login(nextUser) {
    setUser(nextUser);
    localStorage.setItem("movieReviewsUser", JSON.stringify(nextUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("movieReviewsUser");
  }

  return (
    <div className="app-shell">
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/movies">
            Movie Reviews
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Navbar.Text className="me-3">{user.name}</Navbar.Text>
                  <Nav.Link as="button" className="btn btn-link" onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="/movies/:id" element={<Movie user={user} />} />
          <Route path="/movies/:id/review" element={<AddReview user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
