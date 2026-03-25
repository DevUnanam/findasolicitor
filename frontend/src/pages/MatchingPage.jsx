import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { AppShell } from "../components/AppShell";
import { MatchQuestionnaireForm } from "../components/MatchQuestionnaireForm";
import { MatchResultCard } from "../components/MatchResultCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { getMatchingResults, getMatchingSchema, submitMatchingQuestionnaire } from "../lib/services";

const initialQuestionnaire = {
  legalIssue: "",
  location: "",
  urgency: "",
  budgetBand: "",
  serviceMode: "",
  language: "",
  contactMethod: "",
  summary: "",
  goals: [],
  verifiedOnly: true,
  availableNow: false,
};

export function MatchingPage() {
  const { isReady } = useAuth();
  const [questionnaire, setQuestionnaire] = useState(initialQuestionnaire);
  const [submitted, setSubmitted] = useState(false);

  const { data: schema } = useQuery({
    queryKey: ["matching-schema"],
    queryFn: getMatchingSchema,
    enabled: isReady,
  });

  const resultsQuery = useQuery({
    queryKey: ["matching-results", submitted],
    queryFn: getMatchingResults,
    enabled: isReady && submitted,
  });

  const submitMutation = useMutation({
    mutationFn: submitMatchingQuestionnaire,
    onSuccess: () => setSubmitted(true),
  });

  const results = (resultsQuery.data?.matches || []).map((item) => ({
    id: item.id,
    name: item.full_name,
    specialty: item.specialization,
    location: item.location,
    rating: Number(item.average_rating || 0),
    experience: 0,
    hourlyRate: item.hourly_rate,
    fitScore: item.fit_score,
    reasons: item.reasons || [],
  }));

  function handleChange(field, value) {
    setQuestionnaire((current) => ({ ...current, [field]: value }));
  }

  function handleToggleGoal(goal) {
    setQuestionnaire((current) => ({
      ...current,
      goals: current.goals.includes(goal)
        ? current.goals.filter((item) => item !== goal)
        : [...current.goals, goal],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitMutation.mutate({
      legal_issue: questionnaire.legalIssue,
      location: questionnaire.location,
      urgency: questionnaire.urgency,
      budget_band: questionnaire.budgetBand,
      service_mode: questionnaire.serviceMode,
      language_preference: questionnaire.language,
      preferred_contact_method: questionnaire.contactMethod,
      needs_verified_solicitor: questionnaire.verifiedOnly,
      needs_immediate_availability: questionnaire.availableNow,
      case_summary: questionnaire.summary,
      goals: questionnaire.goals,
      notes: questionnaire.summary,
    });
  }

  const options = schema
    ? {
        legalIssues: schema.legal_issues,
        urgency: schema.urgency_levels,
        budgetBands: schema.budget_bands,
        serviceModes: schema.service_modes,
        contactMethods: schema.contact_methods,
        goals: schema.goals,
      }
    : {
        legalIssues: [],
        urgency: [],
        budgetBands: [],
        serviceModes: [],
        contactMethods: [],
        goals: [],
      };

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading matching workspace...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Questionnaire Matching"
          title="Tell the platform what matters, then get ranked solicitor recommendations"
          description="The questionnaire and recommendation results now come from the live Django matching APIs."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6">
            <MatchQuestionnaireForm
              options={options}
              value={questionnaire}
              onChange={handleChange}
              onToggleGoal={handleToggleGoal}
              onSubmit={handleSubmit}
            />

            <div className="panel p-6">
              <h2 className="text-xl font-semibold text-slate-900">How the matching works</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Weights specialization, verification, availability, and experience",
                  "Returns explainable match reasons from the backend scoring flow",
                  "Keeps the interface professional and low-friction for legal clients",
                  "Sets up a clean handoff into case creation and solicitor engagement",
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="space-y-5">
            <div className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Recommendation Summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {submitted ? `${results.length} recommended solicitors` : "Complete the questionnaire to see ranked matches"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {submitted
                  ? "Your top results are ranked by fit score and supported with short reasons from the backend recommendation engine."
                  : "The recommendation panel updates after submission and surfaces the strongest solicitor fits first."}
              </p>
            </div>

            {submitted ? (
              <div className="space-y-5">
                {resultsQuery.isLoading ? (
                  <div className="panel p-6 text-sm text-slate-600">Loading recommendations...</div>
                ) : (
                  results.map((solicitor) => (
                    <MatchResultCard key={solicitor.id} solicitor={solicitor} />
                  ))
                )}
              </div>
            ) : (
              <div className="panel p-10 text-center">
                <p className="text-lg font-semibold text-slate-900">No recommendations yet</p>
                <p className="mt-3 text-sm text-slate-600">
                  Submit the questionnaire to generate ranked solicitor matches based on fit, trust, and availability.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}
