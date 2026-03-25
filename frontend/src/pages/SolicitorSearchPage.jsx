import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { SearchFilters } from "../components/SearchFilters";
import { SectionHeading } from "../components/SectionHeading";
import { SolicitorCard } from "../components/SolicitorCard";
import { getSolicitors } from "../lib/services";

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

  const queryParams = useMemo(
    () => ({
      specialization: selected.specialty || undefined,
      location: selected.location || undefined,
      service_mode: selected.serviceMode || undefined,
      rating: selected.rating || undefined,
      verified: selected.verifiedOnly ? "true" : undefined,
      availability: selected.availableOnly ? "true" : undefined,
      sort: selected.sort,
    }),
    [selected],
  );

  const { data: solicitorResults = [], isLoading } = useQuery({
    queryKey: ["solicitors", queryParams],
    queryFn: () => getSolicitors(queryParams),
  });

  const filters = useMemo(() => {
    const specialties = [...new Set(solicitorResults.map((item) => item.specialization))];
    const locations = [...new Set(solicitorResults.map((item) => item.location))];
    const serviceModes = [...new Set(solicitorResults.flatMap((item) => item.service_modes || []))];

    return {
      specialties,
      locations,
      serviceModes,
      sortOptions: [
        { value: "rating", label: "Top rated" },
        { value: "experience", label: "Most experienced" },
        { value: "price_low", label: "Price: low to high" },
        { value: "price_high", label: "Price: high to low" },
      ],
    };
  }, [solicitorResults]);

  const results = solicitorResults.map((solicitor) => ({
    id: solicitor.id,
    name: solicitor.full_name,
    specialty: solicitor.specialization,
    rating: Number(solicitor.average_rating || 0),
    location: solicitor.location,
    experience: solicitor.years_of_experience,
    hourlyRate: solicitor.hourly_rate,
    consultationFee: solicitor.consultation_fee,
    verified: solicitor.verification_status === "verified",
    availability: solicitor.is_available,
    firmName: solicitor.firm_name,
    serviceModes: solicitor.service_modes || [],
    languages: solicitor.languages || [],
    responseTime: `Responds within ${solicitor.response_time_hours} hours`,
    bio: solicitor.about,
  }));

  function handleChange(field, value) {
    setSelected((current) => ({ ...current, [field]: value }));
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Advanced Search"
          title="Compare solicitors by fit, availability, price, and trust signals"
          description="This experience now uses live Django data, so filters and solicitor cards reflect the actual seeded Nigerian legal directory."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          <SearchFilters filters={filters} selected={selected} onChange={handleChange} />

          <div className="space-y-5">
            <div className="panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Search Results</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{results.length} solicitors found</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Live API results with filter-backed solicitor metadata
                </div>
                <Link to="/matching" className="btn-secondary">
                  Use Smart Matching
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {isLoading ? (
                <div className="panel p-6 text-sm text-slate-600">Loading solicitors...</div>
              ) : (
                results.map((solicitor) => (
                  <SolicitorCard key={solicitor.id} solicitor={solicitor} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
