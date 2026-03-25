import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { AppShell } from "../components/AppShell";
import { formatCurrency, formatDateTime } from "../lib/formatters";
import { getCase } from "../lib/services";

export function CaseDetailPage() {
  const { caseId } = useParams();
  const { data: legalCase, isLoading } = useQuery({
    queryKey: ["case", caseId],
    queryFn: () => getCase(caseId),
    enabled: Boolean(caseId),
  });

  if (isLoading || !legalCase) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading case details...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="panel p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Case Detail</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{legalCase.title}</h1>
                <p className="mt-3 text-sm text-brand-700">{legalCase.legal_category} • {legalCase.solicitor_name || "Awaiting assignment"}</p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
                  {legalCase.status}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {legalCase.priority}
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="mt-2 font-semibold text-slate-900">{formatCurrency(legalCase.budget || 0)}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Preferred contact</p>
                <p className="mt-2 font-semibold text-slate-900">{legalCase.preferred_contact_method || "Not provided"}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">Case Summary</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{legalCase.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">Desired Outcome</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{legalCase.desired_outcome || "No outcome recorded yet."}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-slate-900">Timeline</h2>
              <div className="mt-5 space-y-4">
                {legalCase.updates.map((update) => (
                  <div key={update.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900">{update.title}</h3>
                      <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{update.author_name}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{update.body}</p>
                    <p className="mt-3 text-xs text-slate-400">{formatDateTime(update.created_at)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Next Step</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{legalCase.next_step || "No next step recorded yet."}</p>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/messages" className="btn-primary w-full text-center">Message Solicitor</Link>
                <button className="btn-secondary w-full">Upload Document</button>
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">Documents</h2>
              <div className="mt-5 space-y-3">
                {legalCase.attachments.map((attachment) => (
                  <div key={attachment.id} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{attachment.label || attachment.file}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{attachment.attachment_type || "File"}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/cases" className="btn-secondary w-full text-center">Back to Cases</Link>
          </aside>
        </div>
      </main>
    </AppShell>
  );
}
