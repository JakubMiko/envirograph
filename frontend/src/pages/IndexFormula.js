import React from "react";
import { BsCalculator } from "react-icons/bs";

function IndexFormula() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <BsCalculator size={32} color="#009688" />
        <span style={{ color: "#0077b6", fontWeight: 700, fontSize: "1.25rem" }}>
          Simplified Water Quality Index (ISQA)
        </span>
      </div>
      <div style={{
        fontSize: "1.1rem",
        color: "#333",
        marginBottom: 8,
        fontWeight: 500
      }}>
        ISQA is calculated as:
      </div>
      <div style={{
        fontWeight: 800,
        color: "#009688",
        fontSize: "1.25rem",
        letterSpacing: 1,
        marginBottom: 8,
        background: "linear-gradient(90deg, #b2ebf2 0%, #48cae4 100%)",
        borderRadius: 8,
        padding: "8px 18px",
        display: "inline-block",
        boxShadow: "0 2px 8px #00b4d81a",
        animation: "fadeIn 1.5s"
      }}>
        ISQA = ITEMP × (IBOD + ITSS + IDO + ICOND)
      </div>
      <div style={{ color: "#444", fontSize: "1.05rem", marginTop: 8 }}>
        Where ITEMP, IBOD, ITSS, IDO, and ICOND represent individual index terms with different weighting factors for each parameter.
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(24px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default IndexFormula;