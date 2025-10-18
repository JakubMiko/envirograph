import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar expand="md" bg="white" variant="light" className="shadow-sm" style={{ minHeight: 70 }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
          <span style={{ color: "#0077b6" }}>Enviro</span>
          <span style={{ color: "#48cae4" }}>Graph</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-2">
            <Button
              variant="outline-primary"
              onClick={() => navigate("/login")}
              className="fw-bold"
              style={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;