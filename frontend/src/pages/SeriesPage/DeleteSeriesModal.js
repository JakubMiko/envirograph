import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { apiFetch } from "../../utils/api";

function DeleteSeriesModal({ show, onHide, series, onSeriesDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await apiFetch(`/api/v1/series/${series.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 204) {
        onSeriesDeleted(series.id);
        setLoading(false);
        onHide();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete series");
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
        <Modal.Title className="w-100 text-center">Delete Series</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="text-center">
          <p>
            Are you sure you want to <b>delete</b> the series <b>{series?.attributes?.name}</b>?
          </p>
          <p className="text-danger mb-3">
            This action will also remove <b>all measurements</b> associated with this series.
          </p>
          <div className="d-flex justify-content-center gap-2">
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

export default DeleteSeriesModal;