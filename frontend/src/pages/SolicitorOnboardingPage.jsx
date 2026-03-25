import { AppShell } from "../components/AppShell";

export function SolicitorOnboardingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Solicitor Registration</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Create a trusted legal profile</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            This onboarding flow is structured around the information a legal marketplace needs for credibility:
            identity, specialization, SRA registration, service format, pricing, and verification documents.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Professional details",
                items: ["Full name", "Firm name", "SRA number", "Primary specialization"],
              },
              {
                title: "Practice setup",
                items: ["Location", "Years of experience", "Virtual or in-person services", "Languages"],
              },
              {
                title: "Commercial profile",
                items: ["Hourly rate", "Consultation fee", "Response time", "Availability"],
              },
              {
                title: "Verification documents",
                items: ["ID upload", "Practising certificate", "Proof of firm affiliation", "Compliance review"],
              },
            ].map((section) => (
              <div key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <div className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary">Start Application</button>
            <button className="btn-secondary">View Verification Requirements</button>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
