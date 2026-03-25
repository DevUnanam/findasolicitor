import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { AppointmentCard } from "../components/AppointmentCard";
import { CaseCard } from "../components/CaseCard";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { PaymentCard } from "../components/PaymentCard";
import { ReviewCard } from "../components/ReviewCard";
import { StatCard } from "../components/StatCard";
import { useAuth } from "../features/auth/AuthProvider";
import { getAppointments, getCases, getConversations, getDashboardSummary, getPayments, getReviews } from "../lib/services";
import { formatCurrency, formatDateTime } from "../lib/formatters";

export function DashboardPage() {
  const { isReady, user } = useAuth();
  const { data: summary } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    enabled: isReady,
  });
  const { data: cases = [] } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
    enabled: isReady,
  });
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    enabled: isReady,
  });
  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    enabled: isReady,
  });
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    enabled: isReady,
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    enabled: isReady,
  });

  if (!isReady || !summary) {
    return (
      <div className="min-h-screen bg-brand-50 px-4 py-16 text-sm text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  const caseCards = cases.slice(0, 5).map((item) => ({
    id: item.id,
    title: item.title,
    category: item.legal_category,
    status: item.status,
    priority: item.priority,
    solicitor: item.solicitor_name || "Awaiting assignment",
    budget: item.budget ? formatCurrency(item.budget) : "Budget not set",
    nextStep: item.next_step || "No next step recorded yet.",
  }));

  const appointmentCards = appointments.slice(0, 2).map((item) => ({
    id: item.id,
    solicitor: item.solicitor_name || "Solicitor",
    caseTitle: item.notes || "Consultation",
    date: formatDateTime(item.created_at),
    meetingType: item.meeting_type,
    status: item.status,
    fee: formatCurrency(item.fee_amount),
  }));

  const paymentCards = payments.slice(0, 2).map((item) => ({
    id: item.id,
    description: item.description || "Payment",
    solicitor: item.solicitor_name || "Solicitor",
    amount: formatCurrency(item.amount, item.currency),
    status: item.status,
    date: formatDateTime(item.paid_at || item.created_at),
  }));

  const reviewCards = reviews.slice(0, 2).map((item) => ({
    id: item.id,
    solicitor: item.solicitor_name,
    title: item.title || "Review",
    rating: item.rating,
    comment: item.comment,
    recommend: item.would_recommend,
  }));

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Customer Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, {summary.user.first_name || user?.first_name || "Customer"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Track your cases, appointments, saved solicitors, and secure messages from one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/profile" className="btn-secondary">Profile</Link>
            <Link to="/cases" className="btn-primary">Create New Case</Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <DashboardSidebar />

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
              <StatCard label="Open Cases" value={summary.metrics.cases} helper="Loaded from the live case API" />
              <StatCard label="Unread Messages" value={conversations.reduce((total, item) => total + (item.unread_count || 0), 0)} helper={`Across ${summary.metrics.conversations} conversations`} />
              <StatCard label="Upcoming Appointments" value={appointments.filter((item) => item.status !== "completed").length} helper="Live appointment records" />
            </section>

            <section className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Top Cases</h2>
                  <p className="mt-1 text-sm text-slate-600">Your most recent live case records appear here first.</p>
                </div>
                <Link to="/cases" className="btn-secondary">View All</Link>
              </div>
              <div className="mt-6 grid gap-4">
                {caseCards.map((legalCase) => (
                  <CaseCard key={legalCase.id} legalCase={legalCase} />
                ))}
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Recent Messages</h2>
                  <Link to="/messages" className="btn-secondary">Open Inbox</Link>
                </div>
                <div className="mt-5 space-y-4">
                  {conversations.slice(0, 3).map((conversation) => {
                    const otherParticipant = (conversation.participant_details || []).find((item) => item.id !== user?.id);
                    return (
                      <div key={conversation.id} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">{otherParticipant?.name || conversation.subject || `Conversation #${conversation.id}`}</p>
                        <p className="mt-1">{conversation.last_message?.content || "No messages yet."}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{formatDateTime(conversation.last_message_at || conversation.updated_at)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Upcoming Appointments</h2>
                  <Link to="/appointments" className="btn-secondary">View Schedule</Link>
                </div>
                <div className="mt-5 grid gap-4">
                  {appointmentCards.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Recent Payments</h2>
                  <Link to="/payments" className="btn-secondary">Billing History</Link>
                </div>
                <div className="mt-5 grid gap-4">
                  {paymentCards.map((payment) => (
                    <PaymentCard key={payment.id} payment={payment} />
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Recent Reviews</h2>
                  <Link to="/reviews" className="btn-secondary">View Reviews</Link>
                </div>
                <div className="mt-5 grid gap-4">
                  {reviewCards.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
