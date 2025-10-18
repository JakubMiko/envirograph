import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsDropletHalf } from "react-icons/bs";
import ParameterInfo from "./ParameterInfo";
import IndexFormula from "./IndexFormula";

function LandingPage() {
  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      {/* HERO SECTION */}
      <div className="d-flex align-items-center justify-content-center w-100"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 60%, #f8fafc 100%)",
          boxShadow: "0 8px 32px #00b4d822",
          marginBottom: "56px"
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

      {/* ODDZIELAJĄCA LINIA */}
      <hr className="my-0 mb-5 border-2 border-light" />

      {/* WHAT IS ISQA SECTION */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="mb-5 shadow-sm border-0 rounded-4">
            <Card.Body className="text-center p-4 p-md-5">
              <Card.Title as="h2" className="fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
                What is ISQA?
              </Card.Title>
              <div className="fs-5 mb-3">
                <span className="fw-bold">ISQA</span> is a simple water quality index based on five parameters:
              </div>
              <div className="d-flex justify-content-center mb-4">
                <span className="fw-semibold px-4 py-2 bg-light rounded-pill fs-6 shadow-sm">
                  Temperature, BOD, TSS, DO, Conductivity
                </span>
              </div>
              <div className="fs-5 mb-2">
                <span className="fw-semibold text-info">Higher index values</span> mean better water quality.
              </div>
              <div className="fs-5">
                <span className="fw-semibold text-primary">ISQA</span> is calculated as the temperature index times the sum of the other four index values.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FORMULA SECTION */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <IndexFormula />
        </Col>
      </Row>

      {/* WATER QUALITY INDICATOR SCALE */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="mb-4 shadow-sm border-0 rounded-4">
            <Card.Body className="text-center p-4">
              <h3 className="fw-bold mb-3" style={{ color: "#009688" }}>
                Water Quality Indicator Scale
              </h3>
              <div className="fs-5 mb-2">
                ISQA varies from <strong>0 to 100</strong>, with{" "}
                <span style={{ color: "#388e3c", fontWeight: 700 }}>100</span> indicating excellent water quality.
              </div>
              <div className="fs-5">
                <strong>Simple Water Quality Index:</strong>
                <br />
                <span style={{ color: "#0077b6", fontWeight: 700, fontSize: "1.1rem" }}>
                  ISQA = ITEMP × (IBOD + ITSS + IDO + ICOND)
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr className="my-5 border-2 border-info" />
      <ParameterInfo />
    </Container>
  );
}

export default LandingPage;