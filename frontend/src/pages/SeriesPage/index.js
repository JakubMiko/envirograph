import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SeriesList from "./SeriesList";
import AddSeriesModal from "./AddSeriesModal";
import EditSeriesModal from "./EditSeriesModal";

function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [seriesToEdit, setSeriesToEdit] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = !!user?.attributes?.admin || !!user?.admin;

  useEffect(() => {
    fetch("/api/v1/series")
      .then(res => res.json())
      .then(data => {
        setSeries(data.data || []);
        setLoading(false);
      });
  }, []);

  const handleSeriesAdded = newSeries => {
    setSeries(prev => [newSeries, ...prev]);
  };

  const handleEdit = serie => {
    setSeriesToEdit(serie);
    setEditModal(true);
  };

  const handleSeriesUpdated = updatedSerie => {
    setSeries(prev =>
      prev.map(s => (s.id === updatedSerie.id ? updatedSerie : s))
    );
  };

  return (
    <Container className="px-2" style={{ minHeight: "100vh", maxWidth: "1400px" }}>
      <h2 className="text-center fw-bold my-5" style={{ color: "#0077b6" }}>
        Series
      </h2>
      {isAdmin && (
        <div className="d-flex justify-content-center mb-4">
          <Button variant="primary" className="fw-bold" onClick={() => setShowModal(true)}>
            Add Series
          </Button>
        </div>
      )}
      {loading ? (
        <div className="text-center text-muted">Loading...</div>
      ) : (
        <SeriesList series={series} isAdmin={isAdmin} onEdit={handleEdit} />
      )}
      <AddSeriesModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSeriesAdded={handleSeriesAdded}
      />
      <EditSeriesModal
        show={editModal}
        onHide={() => setEditModal(false)}
        series={seriesToEdit}
        onSeriesUpdated={handleSeriesUpdated}
      />
    </Container>
  );
}

export default SeriesPage;