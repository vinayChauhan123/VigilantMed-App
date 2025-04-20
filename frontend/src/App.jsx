import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Claims from "./pages/claims";
import Claim from "./pages/claim";
import Reports from "./pages/reports.jsx";
import Report from "./pages/report";
import LandingPage from "./pages/landing";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CreateClaim from "./pages/createClaim.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-claim" element={<CreateClaim />} />

          <Route path="/claims" element={<Claims />} />
          <Route path="/claims/:id" element={<Claim />} />

          <Route path="/reports" element={<Reports />} />
          {/* <Route path="/reports/:id" element={<Report />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
