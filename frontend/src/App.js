import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/shared/Layout";
import LoginForm from "./pages/Authentication/LoginForm";
import SeriesPage from "./pages/SeriesPage";
import SeriesDetailsPage from "./pages/SeriesPage/SeriesDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/series/:id" element={<SeriesDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
