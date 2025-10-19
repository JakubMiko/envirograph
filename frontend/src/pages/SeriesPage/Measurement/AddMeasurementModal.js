import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function calculateSWQI({ temperature, bod, tss, doVal, conductivity }) {
  const ITEMP = parseFloat(temperature);
  const IBOD = parseFloat(bod);
  const ITSS = parseFloat(tss);
  const IDO = parseFloat(doVal);
  const ICOND = parseFloat(conductivity);

  if (
    [ITEMP, IBOD, ITSS, IDO, ICOND].some(v => isNaN(v))
  ) return 0; // Zwróć 0 jeśli nie wszystkie pola są wypełnione

  return ITEMP * (IBOD + ITSS + IDO + ICOND);
}

function AddMeasurementModal({ show, onHide, series, onMeasurementAdded }) {
  const [temperature, setTemperature] = useState("");
  const [bod, setBod] = useState("");
  const [tss, setTss] = useState("");
  const [doVal, setDoVal] = useState("");
  const [conductivity, setConductivity] = useState("");
  const [measuredAt, setMeasuredAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (swqiLive === null) {
      setError("Fill all fields to calculate SWQI.");
      setLoading(false);
      return;
    }

    if (swqiLive < series.attributes.min_swqi || swqiLive > series.attributes.max_swqi) {
      setError(`SWQI must be between ${series.attributes.min_swqi} and ${series.attributes.max_swqi}`);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/v1/measurements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          series_id: series.id,
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
        setError(data.error || "Failed to add measurement");
        setLoading(false);
        return;
      }
      onMeasurementAdded(data.data);
      setTemperature("");
      setBod("");
      setTss("");
      setDoVal("");
      setConductivity("");
      setMeasuredAt("");
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
        <Modal.Title className="w-100 text-center">Add Measurement</Modal.Title>
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
            {loading ? "Adding..." : "Add Measurement"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMeasurementModal;