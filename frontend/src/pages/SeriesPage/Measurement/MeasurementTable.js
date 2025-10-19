import React from "react";
import { Table } from "react-bootstrap";
import { BsPencilSquare, BsXCircle } from "react-icons/bs";

function MeasurementTable({
  measurements,
  isAdmin,
  page,
  pageSize,
  onEditMeasurement,
  onDeleteMeasurement,
  onPageChange,
  highlightedMeasurementId,
  onRowHover,
  onRowClick,
  selectedMeasurementId,
  printMode // dodaj printMode
}) {
  const sorted = measurements.sort(
    (a, b) => new Date(b.attributes.measured_at) - new Date(a.attributes.measured_at)
  );
  const paginated = printMode
    ? sorted // jeśli drukujemy, pokaż wszystkie
    : sorted.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  return (
    <>
      <Table
        striped
        bordered
        hover
        responsive
        className="shadow-sm"
        style={{ fontSize: "1em" }}
      >
        <thead style={{ background: "#e3f2fd" }}>
          <tr>
            <th className="text-center" style={{ verticalAlign: "middle" }}>Date</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>SWQI</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>Temperature [°C]</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>BOD [mg/L]</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>TSS [mg/L]</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>DO [mg/L]</th>
            <th className="text-center" style={{ verticalAlign: "middle" }}>Conductivity [μS/cm]</th>
            {isAdmin && !printMode && <th className="text-center" style={{ verticalAlign: "middle" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginated.map(m => (
            <tr
              key={m.id}
              className={
                highlightedMeasurementId === m.id || selectedMeasurementId === m.id
                  ? "table-active border-primary border-3"
                  : ""
              }
              onMouseEnter={() => onRowHover(m.id)}
              onMouseLeave={() => onRowHover(null)}
              onClick={() => onRowClick(m.id)}
            >
              <td
                className="text-center"
                style={{
                  whiteSpace: "nowrap",
                  padding: "6px 12px",
                  minWidth: 140
                }}
              >
                {new Date(m.attributes.measured_at).toLocaleDateString()}{" "}
                {new Date(m.attributes.measured_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </td>
              <td className="fw-bold text-center" style={{ color: "#0077b6", padding: "6px 12px" }}>{m.attributes.swqi}</td>
              <td className="text-center" style={{ padding: "6px 12px" }}>{m.attributes.temperature_c}</td>
              <td className="text-center" style={{ padding: "6px 12px" }}>{m.attributes.bod_mg_L}</td>
              <td className="text-center" style={{ padding: "6px 12px" }}>{m.attributes.tss_mg_L}</td>
              <td className="text-center" style={{ padding: "6px 12px" }}>{m.attributes.do_mg_L}</td>
              <td className="text-center" style={{ padding: "6px 12px" }}>{m.attributes.conductivity_us_cm}</td>
              {isAdmin && !printMode && (
                <td className="text-center" style={{ padding: "6px 12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <BsPencilSquare
                      size={20}
                      style={{ cursor: "pointer", color: "#0077b6" }}
                      title="Edit measurement"
                      onClick={() => onEditMeasurement(m)}
                    />
                    <BsXCircle
                      size={20}
                      style={{ cursor: "pointer", color: "#dc3545" }}
                      title="Delete measurement"
                      onClick={() => onDeleteMeasurement(m)}
                    />
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {!printMode && (
        <div className="d-flex justify-content-center my-3 gap-2">
          <button
            className="btn btn-outline-primary"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
          <span className="align-self-center">Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline-primary"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default MeasurementTable;