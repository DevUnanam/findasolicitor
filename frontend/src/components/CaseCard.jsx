import { Link } from "react-router-dom";

export function CaseCard({ legalCase }) {
  return (
    <article className="panel p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{legalCase.title}</h3>
          <p className="mt-1 text-sm text-brand-700">{legalCase.category}</p>
          <p className="mt-3 text-sm text-slate-600">Assigned solicitor: {legalCase.solicitor}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
            {legalCase.status}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {legalCase.priority}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{legalCase.nextStep}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-500">{legalCase.budget}</span>
        <Link to={`/cases/${legalCase.id}`} className="btn-secondary">Open Case</Link>
      </div>
    </article>
  );
}

