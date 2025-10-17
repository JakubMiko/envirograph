import React, { useEffect, useState } from "react";

function SeriesList() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/series")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setSeries(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#f8f9fa", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px #0001" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Series List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {series && series.length > 0 ? (
          series.map((item) => (
            <li
              key={item.id}
              style={{
                background: "#fff",
                marginBottom: 12,
                padding: 16,
                borderRadius: 6,
                borderLeft: `6px solid ${item.attributes.color || "#007bff"}`,
                boxShadow: "0 1px 4px #0001",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>
                <strong style={{ fontSize: 18 }}>{item.attributes.name}</strong>
                <span style={{ marginLeft: 12, color: "#666" }}>
                  (color: <span style={{ color: item.attributes.color }}>{item.attributes.color}</span>)
                </span>
              </span>
              <span style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: item.attributes.color,
                border: "1px solid #ccc",
                marginLeft: 8
              }} />
            </li>
          ))
        ) : (
          <li>No series found.</li>
        )}
      </ul>
    </div>
  );
}

export default SeriesList;