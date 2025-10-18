import React from "react";
import AppNavbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%)",
      }}
    >
      <AppNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;