import React from "react";
import { Row, Col } from "react-bootstrap";
import SeriesCard from "./SeriesCard";

function SeriesList({ series }) {
  if (!series.length) {
    return <div className="text-center text-muted">No series found.</div>;
  }

  return (
    <Row className="g-4 justify-content-center">
      {series.map(serie => (
        <Col key={serie.id} xs={12} sm={10} md={8} lg={4} xl={4}>
          <SeriesCard serie={serie} />
        </Col>
      ))}
    </Row>
  );
}

export default SeriesList;