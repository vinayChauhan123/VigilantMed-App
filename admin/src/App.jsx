import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Claims from "./pages/claims";
import Reports from "./pages/reports";
import Header from "./components/Header";
import Claim from "./pages/claim";
import CreateReport from "./pages/createReport";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/claims/:id" element={<Claim />} />
        {/* <Route path="/reports" element={<Reports />} /> */}
        <Route path="/create-report/:id" element={<CreateReport />} />
      </Routes>
    </div>
  );
};

export default App;
