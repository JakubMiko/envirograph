import React from "react";
import { BsCalculator } from "react-icons/bs";

function ISQAInfoSection() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center w-100"
      style={{
        minHeight: "70vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #e0f7fa 100%)",
        padding: "64px 0 140px 0",
      }}
    >
      <h2 className="fw-bold text-primary mb-4" style={{ fontSize: "2.4rem", letterSpacing: 1 }}>
        What is ISQA?
      </h2>
      <p className="fs-4 text-secondary fw-medium mb-3 text-center" style={{ maxWidth: 700 }}>
        <span className="fw-bold text-primary">ISQA</span> is a simple water quality index based on five parameters:<br />
        <span className="fw-semibold mx-1 text-primary">
          Temperature, BOD, TSS, DO, Conductivity
        </span>
      </p>
      <p className="fs-5 text-secondary mb-2 text-center">
        Higher index values mean better water quality.
      </p>
      <div
        className="d-flex flex-column align-items-center mb-4"
        style={{
          border: "2px solid #dee2e6",
          borderRadius: "18px",
          padding: "32px 28px",
          background: "transparent",
          maxWidth: 540,
          width: "100%",
        }}
      >
        <span className="d-flex align-items-center gap-2" style={{ marginTop: "-10px", marginBottom: "14px" }}>
          <BsCalculator size={32} color="#0077b6" />
          <span className="fw-bold text-primary" style={{ fontSize: "1.55rem" }}>ISQA Formula</span>
        </span>
        <span className="fw-bold text-primary fs-4 mb-2 text-center" style={{ width: "100%" }}>
          ISQA = ITEMP × (IBOD + ITSS + IDO + ICOND)
        </span>
        <span className="fs-6 text-secondary mt-2 text-center" style={{ maxWidth: 500 }}>
          Where ITEMP, IBOD, ITSS, IDO, and ICOND represent individual index terms with different weighting factors for each parameter.
        </span>
      </div>
      <div className="mt-4 text-center">
        <h3 className="fw-bold mb-2" style={{ color: "#009688" }}>
          Water Quality Indicator Scale
        </h3>
        <p className="fs-5 mb-1">
          ISQA varies from <strong>0 to 100</strong>, with <span style={{ color: "#388e3c", fontWeight: 700 }}>100</span> indicating excellent water quality.
        </p>
      </div>
    </div>
  );
}

export default ISQAInfoSection;