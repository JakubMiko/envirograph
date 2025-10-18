import React from "react";
import { Card, Badge } from "react-bootstrap";
import { BsPencilSquare, BsXCircle } from "react-icons/bs";

function SeriesCard({ serie, isAdmin, onEdit, onDelete }) {
  const { name, min_swqi, max_swqi, color } = serie.attributes;
  const measurementsCount = serie.relationships.measurements.data.length;

  return (
    <Card
      className="h-100 border-0 shadow-sm text-center position-relative"
      style={{
        borderRadius: 18,
        transition: "transform 0.15s, box-shadow 0.15s",
        boxShadow: "0 4px 24px #0077b622",
        cursor: "pointer",
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 8px 32px #0077b644";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 24px #0077b622";
      }}
    >
      <div style={{
        height: 8,
        width: "100%",
        background: color,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18
      }} />
      {isAdmin && (
        <>
          <BsPencilSquare
            size={22}
            className="position-absolute"
            style={{
              top: 14,
              right: 48,
              color: "#0077b6",
              cursor: "pointer",
              opacity: 0.8
            }}
            title="Edit series"
            onClick={e => {
              e.stopPropagation();
              onEdit(serie);
            }}
          />
          <BsXCircle
            size={22}
            className="position-absolute"
            style={{
              top: 14,
              right: 18,
              color: "#dc3545",
              cursor: "pointer",
              opacity: 0.85
            }}
            title="Delete series"
            onClick={e => {
              e.stopPropagation();
              if (typeof onDelete === "function") onDelete(serie);
            }}
          />
        </>
      )}
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title className="fw-bold mb-2" style={{ color: "#0077b6", fontSize: "1.25rem" }}>
          {name}
        </Card.Title>
        <div className="mb-3">
          <Badge bg="info" className="me-2" style={{ fontSize: "0.95em" }}>min: {min_swqi}</Badge>
          <Badge bg="info" style={{ fontSize: "0.95em" }}>max: {max_swqi}</Badge>
        </div>
        <div className="mb-2 text-muted" style={{ fontSize: "1em" }}>
          Measurements: <b>{measurementsCount}</b>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SeriesCard;