import { api } from "./api";

export async function loginDemoUser() {
  const response = await api.post("/auth/login/", {
    email: "customer001@findasolicitor.ng",
    password: "Password123!",
  });

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me/");
  return response.data;
}

export async function getDashboardSummary() {
  const response = await api.get("/dashboard/summary/");
  return response.data;
}

export async function getCustomerProfile() {
  const response = await api.get("/profile/me/");
  return response.data;
}

export async function getSolicitors(params = {}) {
  const response = await api.get("/solicitors/", { params });
  return response.data;
}

export async function getSolicitor(id) {
  const response = await api.get(`/solicitors/${id}/`);
  return response.data;
}

export async function getCases() {
  const response = await api.get("/cases/");
  return response.data;
}

export async function getCase(id) {
  const response = await api.get(`/cases/${id}/`);
  return response.data;
}

export async function createCase(payload) {
  const response = await api.post("/cases/", payload);
  return response.data;
}

export async function getConversations() {
  const response = await api.get("/conversations/");
  return response.data;
}

export async function sendMessage(payload) {
  const response = await api.post("/messages/", payload);
  return response.data;
}

export async function markConversationRead(id) {
  const response = await api.post(`/conversations/${id}/mark_read/`);
  return response.data;
}

export async function getAppointments() {
  const response = await api.get("/appointments/");
  return response.data;
}

export async function getPayments() {
  const response = await api.get("/payments/");
  return response.data;
}

export async function getReviews() {
  const response = await api.get("/reviews/");
  return response.data;
}

export async function submitMatchingQuestionnaire(payload) {
  const response = await api.post("/matching/questionnaire/", payload);
  return response.data;
}

export async function getMatchingResults() {
  const response = await api.get("/matching/results/");
  return response.data;
}

export async function getMatchingSchema() {
  const response = await api.get("/matching/questionnaire/", {
    params: { schema: "true" },
  });
  return response.data;
}
