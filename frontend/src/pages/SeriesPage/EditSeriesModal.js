import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { COLORS } from "./colors";
import { apiFetch } from "../../utils/api";


function EditSeriesModal({ show, onHide, series, onSeriesUpdated }) {
  const [name, setName] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [color, setColor] = useState(COLORS[0].value);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (series) {
      setName(series.attributes.name);
      setMin(series.attributes.min_swqi);
      setMax(series.attributes.max_swqi);
      setColor(series.attributes.color);
    }
  }, [series]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (parseFloat(min) > parseFloat(max)) {
      setError("Min SWQI cannot be greater than Max SWQI");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await apiFetch(`/api/v1/series/${series.id}`, {
        method: "PUT",
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
        setError(data.error || "Failed to update series");
        setLoading(false);
        return;
      }
      onSeriesUpdated(data.data);
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
        <Modal.Title className="w-100 text-center">Edit Series</Modal.Title>
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditSeriesModal;