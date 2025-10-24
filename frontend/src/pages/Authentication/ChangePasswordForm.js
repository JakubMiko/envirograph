import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await apiFetch("/api/v1/users/change_password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || data.message || "Password change failed");
        return;
      }
      setSuccess("Password changed successfully!");
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      setTimeout(() => navigate("/"), 1500);
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
        <h3 className="mb-4 text-primary text-center fw-bold">Change Password</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Change Password
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ChangePasswordForm;