import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsDropletHalf } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function LandingHero() {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center w-100"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 60%, #f8fafc 100%)",
        marginBottom: "0px"
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} className="text-center py-5">
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <span className="d-flex align-items-center justify-content-center rounded-circle p-2"
              style={{
                background: "linear-gradient(135deg, #009ffd 60%, #48cae4 100%)",
                boxShadow: "0 2px 12px #009ffd22"
              }}
            >
              <BsDropletHalf size={38} color="#fff" />
            </span>
            <h1 className="fw-bold mb-0" style={{ fontSize: "2.6rem", letterSpacing: 1, textShadow: "0 2px 12px #fff8" }}>
              <span className="text-primary">Enviro</span>
              <span style={{ color: "#48cae4" }}>Graph</span>
            </h1>
          </div>
          <p className="fs-4 text-secondary mx-auto my-4 fw-medium" style={{ maxWidth: 700, textShadow: "0 1px 8px #fff8" }}>
            Check your water quality in seconds!<br />
            Enter just a few basic parameters and instantly see a clear, science-based index for your river or lake.
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/series")}
              className="fw-bold fs-5 px-4 py-2 rounded-pill shadow"
            >
              Try the calculator
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                const el = document.getElementById("parameters");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100; // 100px offset
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="fw-bold fs-5 px-4 py-2 rounded-pill"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1.5px solid #009ffd",
                color: "#0077b6",
                boxShadow: "0 2px 8px #00b4d822",
              }}
            >
              Learn more
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LandingHero;