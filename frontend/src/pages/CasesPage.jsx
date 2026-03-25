import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

import { AppShell } from "../components/AppShell";
import { CaseCard } from "../components/CaseCard";
import { CaseIntakeForm } from "../components/CaseIntakeForm";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { caseFormOptions } from "../features/cases/mockData";
import { createCase, getCases } from "../lib/services";

const initialForm = {
  title: "",
  legal_category: "",
  priority: "medium",
  preferred_contact_method: "Email",
  description: "",
  desired_outcome: "",
  budget: "",
  client_notes: "",
};

export function CasesPage() {
  const { isReady } = useAuth();
  const [form, setForm] = useState(initialForm);
  const queryClient = useQueryClient();
  const { data: cases = [], isLoading } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
    enabled: isReady,
  });

  const createCaseMutation = useMutation({
    mutationFn: createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
      setForm(initialForm);
    },
  });

  const liveCases = cases.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.legal_category,
    status: item.status,
    priority: item.priority,
    solicitor: item.solicitor_name || "Awaiting assignment",
    budget: item.budget ? `GBP${item.budget}` : "Budget not set",
    nextStep: item.next_step || "No next step recorded yet.",
  }));

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    createCaseMutation.mutate({
      ...form,
      budget: form.budget ? Number(form.budget) : null,
      next_step: "Awaiting solicitor review after intake submission.",
    });
  }

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading case workspace...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Management"
          title="Create, track, and organize legal matters in one structured workspace"
          description="This screen now uses the live Django case APIs for listing and creating matters from the frontend."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <CaseIntakeForm
              options={caseFormOptions}
              value={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSubmitting={createCaseMutation.isPending}
            />
          </div>

          <section className="space-y-5">
            <div className="panel flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Active Portfolio Cases</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{liveCases.length} cases in motion</h2>
              </div>
              <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
            </div>

            <div className="grid gap-5">
              {isLoading ? (
                <div className="panel p-6 text-sm text-slate-600">Loading live cases...</div>
              ) : (
                liveCases.map((legalCase) => (
                  <CaseCard key={legalCase.id} legalCase={legalCase} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
