import { Link } from "react-router-dom";

import { AppShell } from "../components/AppShell";
import { CaseCard } from "../components/CaseCard";
import { CaseIntakeForm } from "../components/CaseIntakeForm";
import { SectionHeading } from "../components/SectionHeading";
import { caseFormOptions, caseRecords } from "../features/cases/mockData";

export function CasesPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Management"
          title="Create, track, and organize legal matters in one structured workspace"
          description="Phase 4 introduces a more realistic legal workflow with intake forms, case cards, progress context, and document-aware detail views."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <CaseIntakeForm options={caseFormOptions} />
          </div>

          <section className="space-y-5">
            <div className="panel flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Active Portfolio Cases</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{caseRecords.length} cases in motion</h2>
              </div>
              <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
            </div>

            <div className="grid gap-5">
              {caseRecords.map((legalCase) => (
                <CaseCard key={legalCase.id} legalCase={legalCase} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

