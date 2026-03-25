export function CaseIntakeForm({ options, value, onChange, onSubmit, isSubmitting }) {
  return (
    <form className="panel p-6" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Case title</label>
          <input
            value={value.title}
            onChange={(event) => onChange("title", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
            placeholder="Tenancy dispute review"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Legal category</label>
          <select
            value={value.legal_category}
            onChange={(event) => onChange("legal_category", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select category</option>
            {options.categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
          <select
            value={value.priority}
            onChange={(event) => onChange("priority", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select priority</option>
            {options.priorities.map((item) => (
              <option key={item} value={item.toLowerCase()}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Preferred contact method</label>
          <select
            value={value.preferred_contact_method}
            onChange={(event) => onChange("preferred_contact_method", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select contact method</option>
            {options.contactMethods.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Case description</label>
        <textarea
          value={value.description}
          onChange={(event) => onChange("description", event.target.value)}
          rows="5"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          placeholder="Describe the issue, context, and what support you need."
        />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Desired outcome</label>
        <textarea
          value={value.desired_outcome}
          onChange={(event) => onChange("desired_outcome", event.target.value)}
          rows="3"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          placeholder="What does a successful outcome look like?"
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Estimated budget</label>
          <input
            value={value.budget}
            onChange={(event) => onChange("budget", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
            placeholder="200000"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Internal note</label>
          <input
            value={value.client_notes}
            onChange={(event) => onChange("client_notes", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
            placeholder="Any extra context for the solicitor"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Case"}
        </button>
        <button type="button" className="btn-secondary">Save Draft</button>
      </div>
    </form>
  );
}
