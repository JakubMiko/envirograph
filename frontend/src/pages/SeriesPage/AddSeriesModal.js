import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { COLORS } from "./colors";

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
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title className="w-100 text-center">Add New Series</Modal.Title>
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
            <Select
              className="color-select"
              value={COLORS.find(c => c.value === color)}
              onChange={option => setColor(option.value)}
              options={COLORS}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.value}
              menuPlacement="auto"
            />
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