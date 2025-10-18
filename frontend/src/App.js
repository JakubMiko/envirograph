import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/shared/Layout";
import LoginForm from "./pages/Authentication/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
