import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)",
      }}
    >
      <Navbar expand="md" bg="white" variant="light" className="shadow-sm" style={{ minHeight: 70 }}>
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            <span style={{ color: "#0077b6" }}>Enviro</span>
            <span style={{ color: "#48cae4" }}>Graph</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link href="/" style={{ fontWeight: 500 }}>Home</Nav.Link>
              <Nav.Link href="#parameters" style={{ fontWeight: 500 }}>Parameters</Nav.Link>
              {/* Dodaj kolejne linki jeśli chcesz */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        {children}
      </main>
      <footer style={{
        marginTop: 48,
        padding: "24px 0 12px 0",
        background: "#e0f7fa",
        textAlign: "center",
        color: "#0077b6",
        fontWeight: 500,
        letterSpacing: 1
      }}>
        &copy; {new Date().getFullYear()} EnviroGraph &mdash; Simple Water Quality Index Calculator
      </footer>
    </div>
  );
}

export default Layout;