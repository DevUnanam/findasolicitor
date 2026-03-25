import { DashboardSidebar } from "../components/DashboardSidebar";
import { StatCard } from "../components/StatCard";

const cases = [
  { title: "Tenancy dispute review", status: "Active", solicitor: "Elaine Foster" },
  { title: "Business contract review", status: "In review", solicitor: "Daniel Webb" },
  { title: "Visa appeal guidance", status: "Pending", solicitor: "Sophie Carter" },
];

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
            <button className="btn-primary">Create New Case</button>
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
                <button className="btn-secondary">View All</button>
              </div>
              <div className="mt-6 space-y-4">
                {cases.map((legalCase) => (
                  <article
                    key={legalCase.title}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:scale-[1.01] hover:bg-white hover:shadow-soft"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{legalCase.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">Assigned solicitor: {legalCase.solicitor}</p>
                      </div>
                      <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
                        {legalCase.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <div className="panel p-6">
                <h2 className="text-xl font-semibold text-slate-900">Recent Messages</h2>
                <div className="mt-5 space-y-4">
                  {[
                    "Elaine Foster: I have reviewed the tenancy documents.",
                    "Daniel Webb: I can take a call on Thursday afternoon.",
                    "Support: Your appointment reminder has been scheduled.",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Appointments</h2>
                <div className="mt-5 space-y-4">
                  {[
                    "Thu 14:00 - Contract review with Daniel Webb",
                    "Fri 10:30 - Family consultation with Elaine Foster",
                  ].map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                      {item}
                    </div>
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
