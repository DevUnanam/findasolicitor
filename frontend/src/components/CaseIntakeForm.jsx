export function CaseIntakeForm({ options }) {
  return (
    <form className="panel p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Case title</label>
          <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400" placeholder="Tenancy dispute review" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Legal category</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400">
            <option value="">Select category</option>
            {options.categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400">
            <option value="">Select priority</option>
            {options.priorities.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Preferred contact method</label>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400">
            <option value="">Select contact method</option>
            {options.contactMethods.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Case description</label>
        <textarea rows="5" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400" placeholder="Describe the issue, context, and what support you need." />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">Desired outcome</label>
        <textarea rows="3" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400" placeholder="What does a successful outcome look like?" />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Estimated budget</label>
          <input className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-brand-400" placeholder="GBP2,000" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Upload documents</label>
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            Drop files here or browse
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="button" className="btn-primary">Create Case</button>
        <button type="button" className="btn-secondary">Save Draft</button>
      </div>
    </form>
  );
}
