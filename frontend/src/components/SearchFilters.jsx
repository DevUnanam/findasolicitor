export function SearchFilters({
  filters,
  selected,
  onChange,
}) {
  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Filter Solicitors</h2>
      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Specialization</label>
          <select
            value={selected.specialty}
            onChange={(event) => onChange("specialty", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">All specializations</option>
            {filters.specialties.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
          <select
            value={selected.location}
            onChange={(event) => onChange("location", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">All locations</option>
            {filters.locations.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Service mode</label>
          <select
            value={selected.serviceMode}
            onChange={(event) => onChange("serviceMode", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">All service modes</option>
            {filters.serviceModes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Minimum rating</label>
          <select
            value={selected.rating}
            onChange={(event) => onChange("rating", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.9">4.9</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Sort by</label>
          <select
            value={selected.sort}
            onChange={(event) => onChange("sort", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            {filters.sortOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={selected.verifiedOnly}
            onChange={(event) => onChange("verifiedOnly", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-700"
          />
          Verified solicitors only
        </label>

        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={selected.availableOnly}
            onChange={(event) => onChange("availableOnly", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-700"
          />
          Currently available
        </label>
      </div>
    </div>
  );
}
