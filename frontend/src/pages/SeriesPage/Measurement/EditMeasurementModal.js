import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { calculateSWQI } from "../../../utils/measurement/swqi_calculate";

function EditMeasurementModal({ show, onHide, measurement, series, onMeasurementUpdated }) {
  const [temperature, setTemperature] = useState("");
  const [bod, setBod] = useState("");
  const [tss, setTss] = useState("");
  const [doVal, setDoVal] = useState("");
  const [conductivity, setConductivity] = useState("");
  const [measuredAt, setMeasuredAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (measurement) {
      setTemperature(measurement.attributes.temperature_c);
      setBod(measurement.attributes.bod_mg_L);
      setTss(measurement.attributes.tss_mg_L);
      setDoVal(measurement.attributes.do_mg_L);
      setConductivity(measurement.attributes.conductivity_us_cm);
      setMeasuredAt(measurement.attributes.measured_at.slice(0, 16)); // yyyy-mm-ddTHH:mm
    }
  }, [measurement]);

  const swqiLive = calculateSWQI({
    temperature,
    bod,
    tss,
    doVal,
    conductivity
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (swqiLive < series.attributes.min_swqi || swqiLive > series.attributes.max_swqi) {
      setError(`SWQI must be between ${series.attributes.min_swqi} and ${series.attributes.max_swqi}`);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/v1/measurements/${measurement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          temperature_c: parseFloat(temperature),
          bod_mg_L: parseFloat(bod),
          tss_mg_L: parseFloat(tss),
          do_mg_L: parseFloat(doVal),
          conductivity_us_cm: parseFloat(conductivity),
          swqi: swqiLive,
          measured_at: measuredAt
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to update measurement");
        setLoading(false);
        return;
      }
      onMeasurementUpdated(data.data);
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
        <Modal.Title className="w-100 text-center">Edit Measurement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={measuredAt}
              onChange={e => setMeasuredAt(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Temperature [°C]</Form.Label>
            <Form.Control
              type="number"
              value={temperature}
              onChange={e => setTemperature(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>BOD [mg/L]</Form.Label>
            <Form.Control
              type="number"
              value={bod}
              onChange={e => setBod(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>TSS [mg/L]</Form.Label>
            <Form.Control
              type="number"
              value={tss}
              onChange={e => setTss(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>DO [mg/L]</Form.Label>
            <Form.Control
              type="number"
              value={doVal}
              onChange={e => setDoVal(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Conductivity [μS/cm]</Form.Label>
            <Form.Control
              type="number"
              value={conductivity}
              onChange={e => setConductivity(e.target.value)}
              required
              step="0.1"
            />
          </Form.Group>
          <div className="text-center my-3">
            <span className="fw-bold">Calculated SWQI:</span>{" "}
            <span style={{ color: "#0077b6", fontSize: "1.2em" }}>{swqiLive.toFixed(2)}</span>
            <div className="mt-2">
              <span className="fw-bold">Note:</span>{" "}
              SWQI will be calculated and updated automatically once all parameters are filled in. If any field is missing, SWQI is shown as 0.
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditMeasurementModal;