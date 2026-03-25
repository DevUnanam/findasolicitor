export function MatchQuestionnaireForm({ options, value, onChange, onToggleGoal, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="panel p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Legal issue</label>
          <select
            value={value.legalIssue}
            onChange={(event) => onChange("legalIssue", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select legal issue</option>
            {options.legalIssues.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Preferred location</label>
          <input
            value={value.location}
            onChange={(event) => onChange("location", event.target.value)}
            placeholder="London"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Urgency</label>
          <select
            value={value.urgency}
            onChange={(event) => onChange("urgency", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select urgency</option>
            {options.urgency.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Budget band</label>
          <select
            value={value.budgetBand}
            onChange={(event) => onChange("budgetBand", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select budget</option>
            {options.budgetBands.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Service mode</label>
          <select
            value={value.serviceMode}
            onChange={(event) => onChange("serviceMode", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
          >
            <option value="">Select mode</option>
            {options.serviceModes.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Preferred contact method</label>
          <select
            value={value.contactMethod}
            onChange={(event) => onChange("contactMethod", event.target.value)}
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
        <label className="mb-2 block text-sm font-medium text-slate-700">Case summary</label>
        <textarea
          value={value.summary}
          onChange={(event) => onChange("summary", event.target.value)}
          rows="4"
          placeholder="Briefly describe what you need help with."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400"
        />
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-medium text-slate-700">What matters most?</p>
        <div className="flex flex-wrap gap-2">
          {options.goals.map((goal) => {
            const active = value.goals.includes(goal);
            return (
              <button
                type="button"
                key={goal}
                onClick={() => onToggleGoal(goal)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-brand-700 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:scale-105 hover:bg-brand-50"
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={value.verifiedOnly}
            onChange={(event) => onChange("verifiedOnly", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-700"
          />
          Verified solicitors only
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={value.availableNow}
            onChange={(event) => onChange("availableNow", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-brand-700"
          />
          Need immediate availability
        </label>
      </div>

      <button className="btn-primary mt-6">Get Recommended Solicitors</button>
    </form>
  );
}

