import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar expand="md" bg="white" variant="light" className="shadow-sm app-navbar" style={{ minHeight: 70 }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
          <span style={{ color: "#0077b6" }}>Enviro</span>
          <span style={{ color: "#48cae4" }}>Graph</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <div className="d-flex w-100 align-items-center">
            <Nav className="flex-column flex-md-row align-items-center gap-3 flex-grow-1 justify-content-center">
              <Nav.Link
                onClick={() => navigate("/series")}
                className="fw-bold px-3 py-2"
                style={{
                  fontWeight: 700,
                  letterSpacing: 1,
                  fontSize: "1.1rem",
                  color: "#0077b6",
                  borderBottom: "3px solid #48cae4",
                  background: "transparent",
                  borderRadius: 0,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseOver={e => {
                  e.target.style.color = "#009ffd";
                  e.target.style.borderBottom = "3px solid #009ffd";
                }}
                onMouseOut={e => {
                  e.target.style.color = "#0077b6";
                  e.target.style.borderBottom = "3px solid #48cae4";
                }}
              >
                Series
              </Nav.Link>
              {user && (
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="fw-bold d-block d-md-none mt-2"
                  style={{ fontWeight: 700, letterSpacing: 1 }}
                >
                  Logout
                </Button>
              )}
            </Nav>
            {user && (
              <div className="ms-md-auto d-none d-md-flex align-items-center gap-3">
                <span
                  className="fw-bold"
                  style={{ color: "#0077b6", fontWeight: 700 }}
                >
                  Hi, {user.attributes?.first_name || user.first_name}
                </span>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="fw-bold"
                  style={{ fontWeight: 700, letterSpacing: 1 }}
                >
                  Logout
                </Button>
              </div>
            )}
            {!user && (
              <div className="ms-md-auto mt-3 mt-md-0">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                  className="fw-bold"
                  style={{ fontWeight: 700, letterSpacing: 1 }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;