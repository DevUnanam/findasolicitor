import { Link } from "react-router-dom";

export function MatchResultCard({ solicitor }) {
  return (
    <article className="panel p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Recommended Match</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{solicitor.name}</h3>
          <p className="mt-1 text-sm text-brand-700">{solicitor.specialty} • {solicitor.location}</p>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Fit Score</p>
          <p className="mt-1 text-2xl font-bold text-brand-800">{solicitor.fitScore}%</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <span>{solicitor.rating} / 5.0 rating</span>
        <span>{solicitor.experience} years experience</span>
        <span>From GBP{solicitor.hourlyRate}/hr</span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-700">Why this match works</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {solicitor.reasons.map((reason) => (
            <span key={reason} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {reason}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to={`/solicitors/${solicitor.id}`} className="btn-primary">View Profile</Link>
        <button className="btn-secondary">Start Conversation</button>
      </div>
    </article>
  );
}
