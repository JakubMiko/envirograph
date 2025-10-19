import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiFetch("/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.data));
      navigate("/series");
      window.location.reload();
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center w-100"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 60%, #f8fafc 100%)",
      }}
    >
      <Card className="shadow p-4" style={{ minWidth: 340, maxWidth: 400 }}>
        <h3 className="mb-4 text-primary text-center fw-bold">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Log in
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;