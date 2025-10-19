import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { apiFetch } from "../../../utils/api";

function DeleteMeasurementModal({ show, onHide, measurement, onMeasurementDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await apiFetch(`/api/v1/measurements/${measurement.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 204) {
        onMeasurementDeleted(measurement.id);
        setLoading(false);
        onHide();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete measurement");
        setLoading(false);
      }
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title className="w-100 text-center">Delete Measurement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="text-center">
          <p>
            Are you sure you want to <b>delete</b> this measurement?
          </p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Button variant="secondary" onClick={onHide} disabled={loading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteMeasurementModal;