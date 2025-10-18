import React from "react";

function Footer() {
  return (
    <footer style={{
      padding: "24px 0 12px 0",
      background: "linear-gradient(180deg, #e0f7fa 0%, #f8fafc 100%)",
      textAlign: "center",
      color: "#0077b6",
      fontWeight: 500,
      letterSpacing: 1
    }}>
      &copy; {new Date().getFullYear()} EnviroGraph &mdash; Simple Water Quality Index Calculator
    </footer>
  );
}

export default Footer;