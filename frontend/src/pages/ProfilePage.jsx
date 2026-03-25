import { AppShell } from "../components/AppShell";
import { customerProfile } from "../features/profile/mockData";

export function ProfilePage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Profile Settings</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Customer profile</h1>
            <p className="mt-3 text-sm text-slate-600">
              Edit contact details, legal preferences, and communication settings from one structured workspace.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ["Full name", customerProfile.name],
                ["Email", customerProfile.email],
                ["Phone", customerProfile.phone],
                ["Address", customerProfile.address],
                ["City", customerProfile.city],
                ["Country", customerProfile.country],
                ["Preferred budget", customerProfile.budgetBand],
                ["Contact method", customerProfile.contactMethod],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-slate-700">Legal preferences</p>
              <div className="flex flex-wrap gap-2">
                {customerProfile.legalPreferences.map((item) => (
                  <span key={item} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Saved solicitors</h2>
              <div className="mt-5 space-y-3">
                {customerProfile.savedSolicitors.map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Phase 2 coverage</h2>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">Editable account and preference structure</li>
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">Saved solicitors view</li>
                <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">Top-case-ready profile surface</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}

