import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

