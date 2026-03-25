import { useQuery } from "@tanstack/react-query";

import { AppShell } from "../components/AppShell";
import { useAuth } from "../features/auth/AuthProvider";
import { getCustomerProfile } from "../lib/services";

export function ProfilePage() {
  const { isReady } = useAuth();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile-me"],
    queryFn: getCustomerProfile,
    enabled: isReady,
  });

  if (!isReady || isLoading || !profile) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading customer profile...
        </main>
      </AppShell>
    );
  }

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
                ["Full name", `${profile.user.first_name} ${profile.user.last_name}`.trim()],
                ["Email", profile.user.email],
                ["Phone", profile.user.phone || "Not provided"],
                ["Address", profile.user.address || "Not provided"],
                ["City", profile.city || "Not provided"],
                ["Country", profile.country || "Not provided"],
                ["Preferred budget", profile.preferred_budget_band || "Not provided"],
                ["Contact method", profile.preferred_contact_method || "Not provided"],
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
                {(profile.legal_preferences?.interests || []).map((item) => (
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
                {profile.saved_solicitors.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {item.solicitor_name}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Top cases</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                {profile.top_cases.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    {item.title} • {item.status}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
