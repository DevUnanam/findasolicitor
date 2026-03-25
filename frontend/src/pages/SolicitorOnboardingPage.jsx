import { useQuery } from "@tanstack/react-query";

import { AppShell } from "../components/AppShell";
import { useAuth } from "../features/auth/AuthProvider";
import { getMySolicitorProfile } from "../lib/services";

export function SolicitorOnboardingPage() {
  const { isReady, user } = useAuth();
  const solicitorProfileQuery = useQuery({
    queryKey: ["solicitor-me"],
    queryFn: getMySolicitorProfile,
    enabled: isReady && user?.role === "solicitor",
    retry: false,
  });

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Solicitor Registration</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Create a trusted legal profile</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            This workspace is now aware of backend account state. The current demo session is a customer account, so
            solicitor onboarding is shown as an admin-reviewed application flow rather than a fully active submission form.
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            <p><span className="font-semibold">Current session role:</span> {user?.role || "Loading"}</p>
            <p className="mt-2">
              {user?.role === "solicitor"
                ? solicitorProfileQuery.data
                  ? "A solicitor profile already exists for this account and can be managed through the solicitor APIs."
                  : "No solicitor profile exists yet for this account."
                : "Use a solicitor-role account to complete live profile creation and verification workflows."}
            </p>
          </div>

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
