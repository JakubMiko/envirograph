import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Badge, Table, Button } from "react-bootstrap";
import AddMeasurementModal from "./Measurement/AddMeasurementModal";

function SeriesDetailsPage() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [author, setAuthor] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    fetch(`/api/v1/series/${id}`)
      .then(res => res.json())
      .then(data => {
        setSeries(data.data);
        setLoading(false);

        const userId = data.data.attributes.user_id;
        fetch(`/api/v1/users/${userId}`)
          .then(res => res.json())
          .then(userData => {
            setAuthor(userData.data);
          });

        const measurementIds = data.data.relationships.measurements.data.map(m => m.id);
        const measurementsFull = (data.included || [])
          .filter(i => i.type === "measurement" && measurementIds.includes(i.id));
        setMeasurements(measurementsFull);
      });
  }, [id]);

  if (loading) {
    return <Container className="py-5"><div className="text-center text-muted">Loading...</div></Container>;
  }

  if (!series) {
    return <Container className="py-5"><div className="text-center text-danger">Series not found.</div></Container>;
  }

  const { name, min_swqi, max_swqi, color } = series.attributes;

  const sortedMeasurements = measurements
    .sort((a, b) => new Date(b.attributes.measured_at) - new Date(a.attributes.measured_at));
  const paginated = sortedMeasurements.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sortedMeasurements.length / pageSize);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = !!user?.attributes?.admin || !!user?.admin;

  const handleMeasurementAdded = newMeasurement => {
    setMeasurements(prev => {
      const updated = [...prev, newMeasurement];
      return updated.sort((a, b) =>
        new Date(b.attributes.measured_at) - new Date(a.attributes.measured_at)
      );
    });
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
      <div className="mb-4 p-4 rounded shadow-sm" style={{ background: "#f8f9fa" }}>
        <h2 className="fw-bold text-center mb-3" style={{ color: "#0077b6", letterSpacing: 1 }}>
          {name}
        </h2>
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 mb-2">
          <div>
            <Badge bg="info" className="me-2">min: {min_swqi}</Badge>
            <Badge bg="info">max: {max_swqi}</Badge>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Color:</span>
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 18,
                background: color,
                borderRadius: 6,
                border: "1px solid #ddd",
                verticalAlign: "middle"
              }}
              title={color}
            />
            <span style={{ color: "#555", fontSize: "0.95em" }}>{color}</span>
          </div>
          {author && (
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">Author:</span>
              <span style={{ color: "#0077b6" }}>
                {author.attributes.first_name} {author.attributes.last_name}
              </span>
            </div>
          )}
        </div>
      </div>

      <h4 className="fw-bold mt-5 mb-3 text-center" style={{ color: "#0077b6" }}>Measurements</h4>
      {isAdmin && (
        <div className="d-flex justify-content-center mb-3">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Add Measurement
          </Button>
        </div>
      )}
      {measurements.length === 0 ? (
        <div className="text-center text-muted">No measurements found.</div>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead style={{ background: "#e3f2fd" }}>
              <tr>
                <th>Date</th>
                <th>SWQI</th>
                <th>Temperature [°C]</th>
                <th>BOD [mg/L]</th>
                <th>TSS [mg/L]</th>
                <th>DO [mg/L]</th>
                <th>Conductivity [μS/cm]</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(m => (
                <tr key={m.id}>
                  <td>{new Date(m.attributes.measured_at).toLocaleString()}</td>
                  <td className="fw-bold" style={{ color: "#0077b6" }}>{m.attributes.swqi}</td>
                  <td>{m.attributes.temperature_c}</td>
                  <td>{m.attributes.bod_mg_L}</td>
                  <td>{m.attributes.tss_mg_L}</td>
                  <td>{m.attributes.do_mg_L}</td>
                  <td>{m.attributes.conductivity_us_cm}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center my-3 gap-2">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="align-self-center">Page {page} of {totalPages}</span>
            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      <AddMeasurementModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        series={series}
        onMeasurementAdded={handleMeasurementAdded}
      />
    </Container>
  );
}

export default SeriesDetailsPage;