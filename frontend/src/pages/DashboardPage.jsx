import { Link } from "react-router-dom";

import { AppointmentCard } from "../components/AppointmentCard";
import { CaseCard } from "../components/CaseCard";
import { DashboardSidebar } from "../components/DashboardSidebar";
import { PaymentCard } from "../components/PaymentCard";
import { ReviewCard } from "../components/ReviewCard";
import { StatCard } from "../components/StatCard";
import { appointments } from "../features/appointments/mockData";
import { caseRecords } from "../features/cases/mockData";
import { conversations } from "../features/messaging/mockData";
import { payments } from "../features/payments/mockData";
import { reviews } from "../features/reviews/mockData";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Customer Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Welcome back, Amara</h1>
            <p className="mt-2 text-sm text-slate-600">
              Track your cases, appointments, saved solicitors, and secure messages from one place.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary">Saved Solicitors</button>
            <Link to="/cases" className="btn-primary">Create New Case</Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <DashboardSidebar />

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
              <StatCard label="Open Cases" value="3" helper="1 needs a solicitor response" />
              <StatCard label="Unread Messages" value="8" helper="Across 4 conversations" />
              <StatCard label="Upcoming Appointments" value="2" helper="Next meeting tomorrow" />
            </section>

            <section className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Top Cases</h2>
                  <p className="mt-1 text-sm text-slate-600">Your five most relevant matters appear here first.</p>
                </div>
                <Link to="/cases" className="btn-secondary">View All</Link>
              </div>
              <div className="mt-6 grid gap-4">
                {caseRecords.map((legalCase) => (
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
                  {conversations.map((conversation) => (
                    <div key={conversation.id} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                      <p className="font-semibold text-slate-900">{conversation.participant}</p>
                      <p className="mt-1">{conversation.messages[conversation.messages.length - 1]?.text}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{conversation.lastSeen}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Upcoming Appointments</h2>
                  <Link to="/appointments" className="btn-secondary">View Schedule</Link>
                </div>
                <div className="mt-5 grid gap-4">
                  {appointments.map((appointment) => (
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
                  {payments.map((payment) => (
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
                  {reviews.map((review) => (
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
