import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../pages/DashboardPage";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { MatchingPage } from "../pages/MatchingPage";
import { SolicitorDetailPage } from "../pages/SolicitorDetailPage";
import { SolicitorOnboardingPage } from "../pages/SolicitorOnboardingPage";
import { SolicitorSearchPage } from "../pages/SolicitorSearchPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/solicitors" element={<SolicitorSearchPage />} />
        <Route path="/solicitors/:solicitorId" element={<SolicitorDetailPage />} />
        <Route path="/solicitor/onboarding" element={<SolicitorOnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
