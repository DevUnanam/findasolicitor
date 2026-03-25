import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { AppShell } from "../components/AppShell";
import { formatCurrency } from "../lib/formatters";
import { getSolicitor } from "../lib/services";

export function SolicitorDetailPage() {
  const { solicitorId } = useParams();
  const { data: solicitor, isLoading } = useQuery({
    queryKey: ["solicitor", solicitorId],
    queryFn: () => getSolicitor(solicitorId),
    enabled: Boolean(solicitorId),
  });

  if (isLoading || !solicitor) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading solicitor profile...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="panel p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Solicitor Profile</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{solicitor.full_name}</h1>
                <p className="mt-3 text-base text-brand-700">{solicitor.specialization} at {solicitor.firm_name}</p>
              </div>
              <span className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
                {solicitor.verification_status === "verified" ? "Verified" : "Verification Pending"}
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 font-semibold text-slate-900">{solicitor.location}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Experience</p>
                <p className="mt-2 font-semibold text-slate-900">{solicitor.years_of_experience} years</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hourly Rate</p>
                <p className="mt-2 font-semibold text-slate-900">{formatCurrency(solicitor.hourly_rate)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Consultation Fee</p>
                <p className="mt-2 font-semibold text-slate-900">{formatCurrency(solicitor.consultation_fee)}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">About</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{solicitor.about}</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Service Modes</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(solicitor.service_modes || []).map((mode) => (
                    <span key={mode} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Languages</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(solicitor.languages || []).map((language) => (
                    <span key={language} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Trust Summary</p>
              <div className="mt-5 space-y-4 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  Rating: {Number(solicitor.average_rating || 0)} / 5.0
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  Responds within {solicitor.response_time_hours} hours
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {solicitor.is_available ? "Accepting new clients" : "Limited availability"}
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Next Actions</h2>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/appointments" className="btn-primary w-full text-center">Book Consultation</Link>
                <Link to="/messages" className="btn-secondary w-full text-center">Send Message</Link>
                <button className="btn-secondary w-full">Save Solicitor</button>
              </div>
              <Link to="/solicitors" className="mt-4 inline-flex text-sm font-semibold text-brand-700 transition-all duration-200 hover:text-brand-800">
                Back to results
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
