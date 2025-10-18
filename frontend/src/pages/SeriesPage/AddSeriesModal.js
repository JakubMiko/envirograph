import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const COLORS = [
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Orange", value: "orange" },
  { name: "Purple", value: "purple" },
  { name: "Red", value: "red" },
  { name: "Black", value: "black" },
  { name: "Teal", value: "teal" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Cyan", value: "cyan" },
  { name: "Indigo", value: "indigo" },
  { name: "Gray", value: "gray" },
  { name: "Brown", value: "brown" },
  { name: "Lime", value: "lime" },
  { name: "Amber", value: "amber" }
];

function AddSeriesModal({ show, onHide, onSeriesAdded }) {
  const [name, setName] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/v1/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          min_swqi: parseFloat(min),
          max_swqi: parseFloat(max),
          color
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add series");
        setLoading(false);
        return;
      }
      onSeriesAdded(data.data);
      setName("");
      setMin("");
      setMax("");
      setColor(COLORS[0].value);
      setLoading(false);
      onHide();
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Series</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Min SWQI</Form.Label>
            <Form.Control
              type="number"
              value={min}
              onChange={e => setMin(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Max SWQI</Form.Label>
            <Form.Control
              type="number"
              value={max}
              onChange={e => setMax(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Select value={color} onChange={e => setColor(e.target.value)}>
              {COLORS.map(c => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={loading}>
            {loading ? "Adding..." : "Add Series"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddSeriesModal;