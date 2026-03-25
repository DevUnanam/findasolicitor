import { Link, useParams } from "react-router-dom";

import { AppShell } from "../components/AppShell";
import { solicitorDirectory } from "../features/solicitors/mockData";

export function SolicitorDetailPage() {
  const { solicitorId } = useParams();
  const solicitor = solicitorDirectory.find((item) => item.id === solicitorId) || solicitorDirectory[0];

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="panel p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Solicitor Profile</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{solicitor.name}</h1>
                <p className="mt-3 text-base text-brand-700">{solicitor.specialty} at {solicitor.firmName}</p>
              </div>
              <span className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-800">
                {solicitor.verified ? "Verified" : "Verification Pending"}
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 font-semibold text-slate-900">{solicitor.location}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Experience</p>
                <p className="mt-2 font-semibold text-slate-900">{solicitor.experience} years</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hourly Rate</p>
                <p className="mt-2 font-semibold text-slate-900">GBP{solicitor.hourlyRate}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Consultation Fee</p>
                <p className="mt-2 font-semibold text-slate-900">GBP{solicitor.consultationFee}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">About</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{solicitor.bio}</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Service Modes</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {solicitor.serviceModes.map((mode) => (
                    <span key={mode} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Languages</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {solicitor.languages.map((language) => (
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
                  Rating: {solicitor.rating} / 5.0
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {solicitor.responseTime}
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {solicitor.availability ? "Accepting new clients" : "Limited availability"}
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Next Actions</h2>
              <div className="mt-5 flex flex-col gap-3">
                <button className="btn-primary w-full">Book Consultation</button>
                <button className="btn-secondary w-full">Send Message</button>
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

