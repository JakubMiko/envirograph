import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsDropletHalf, BsCalculator } from "react-icons/bs";
import ParameterInfo from "./ParameterInfo";

function LandingPage() {
  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      {/* HERO SECTION */}
      <div className="d-flex align-items-center justify-content-center w-100"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 60%, #f8fafc 100%)",
          marginBottom: "0px" // zmniejsz lub ustaw na 0
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
                href="#parameters"
                className="fw-bold fs-5 px-4 py-2 rounded-pill shadow"
              >
                Try the calculator
              </Button>
              <Button
                variant="outline-primary"
                href="#parameters"
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

      {/* ISQA INFO SECTION - minimalistycznie, bez cardów */}
      <div
        className="d-flex flex-column align-items-center justify-content-center w-100"
        style={{
          minHeight: "70vh",
          background: "linear-gradient(180deg, #f8fafc 0%, #e0f7fa 100%)",
          padding: "64px 0 48px 0",
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

      {/* PŁYNNE PRZEJŚCIE MIĘDZY SEKCJAMI */}
      <div
        style={{
          width: "100%",
          height: "64px",
          background: "linear-gradient(180deg, #e0f7fa 0%, #f8fafc 100%)",
          margin: 0,
          padding: 0,
        }}
      />

      <ParameterInfo />
    </Container>
  );
}

export default LandingPage;