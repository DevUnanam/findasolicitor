import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../pages/DashboardPage";
import { CasesPage } from "../pages/CasesPage";
import { CaseDetailPage } from "../pages/CaseDetailPage";
import { HomePage } from "../pages/HomePage";
import { MessagesPage } from "../pages/MessagesPage";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import { PaymentsPage } from "../pages/PaymentsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ReviewsPage } from "../pages/ReviewsPage";
import { MatchingPage } from "../pages/MatchingPage";
import { SolicitorDetailPage } from "../pages/SolicitorDetailPage";
import { SolicitorOnboardingPage } from "../pages/SolicitorOnboardingPage";
import { SolicitorSearchPage } from "../pages/SolicitorSearchPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:caseId" element={<CaseDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/solicitors" element={<SolicitorSearchPage />} />
        <Route path="/solicitors/:solicitorId" element={<SolicitorDetailPage />} />
        <Route path="/solicitor/onboarding" element={<SolicitorOnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
