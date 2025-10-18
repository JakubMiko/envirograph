import React from "react";
import { Container } from "react-bootstrap";
import LandingHero from "./LandingHero";
import ISQAInfoSection from "./ISQAInfoSection";
import ParameterInfo from "./ParameterInfo";

function LandingPage() {
  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <LandingHero />
      <ParameterInfo />
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
      <ISQAInfoSection />
    </Container>
  );
}

export default LandingPage;