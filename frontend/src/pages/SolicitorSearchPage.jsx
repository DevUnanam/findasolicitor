import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { SearchFilters } from "../components/SearchFilters";
import { SectionHeading } from "../components/SectionHeading";
import { SolicitorCard } from "../components/SolicitorCard";
import { searchFilters, solicitorDirectory } from "../features/solicitors/mockData";

export function SolicitorSearchPage() {
  const [selected, setSelected] = useState({
    specialty: "",
    location: "",
    serviceMode: "",
    rating: "",
    sort: "rating",
    verifiedOnly: false,
    availableOnly: false,
  });

  const results = useMemo(() => {
    let filtered = [...solicitorDirectory];

    if (selected.specialty) {
      filtered = filtered.filter((item) => item.specialty === selected.specialty);
    }
    if (selected.location) {
      filtered = filtered.filter((item) => item.location === selected.location);
    }
    if (selected.serviceMode) {
      filtered = filtered.filter((item) => item.serviceModes.includes(selected.serviceMode));
    }
    if (selected.rating) {
      filtered = filtered.filter((item) => item.rating >= Number(selected.rating));
    }
    if (selected.verifiedOnly) {
      filtered = filtered.filter((item) => item.verified);
    }
    if (selected.availableOnly) {
      filtered = filtered.filter((item) => item.availability);
    }

    const sorters = {
      rating: (a, b) => b.rating - a.rating,
      experience: (a, b) => b.experience - a.experience,
      price_low: (a, b) => a.hourlyRate - b.hourlyRate,
      price_high: (a, b) => b.hourlyRate - a.hourlyRate,
    };

    return filtered.sort(sorters[selected.sort]);
  }, [selected]);

  function handleChange(field, value) {
    setSelected((current) => ({ ...current, [field]: value }));
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Advanced Search"
          title="Compare solicitors by fit, availability, price, and trust signals"
          description="This Phase 2 experience is designed to feel like a realistic legal marketplace search workflow, with structured filters and clear profile summaries."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <SearchFilters filters={searchFilters} selected={selected} onChange={handleChange} />

          <div className="space-y-5">
            <div className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Search Results</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{results.length} solicitors found</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Verified, filterable, and recruiter-friendly presentation
                </div>
                <Link to="/matching" className="btn-secondary">
                  Use Smart Matching
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {results.map((solicitor) => (
                <SolicitorCard key={solicitor.id} solicitor={solicitor} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
