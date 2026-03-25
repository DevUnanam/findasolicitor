import { Link } from "react-router-dom";

export function SolicitorCard({ solicitor }) {
  return (
    <article className="panel p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{solicitor.name}</h3>
          <p className="mt-1 text-sm text-brand-700">{solicitor.specialty}</p>
          <p className="mt-2 text-sm text-slate-500">{solicitor.firmName}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            solicitor.verified
              ? "bg-brand-100 text-brand-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {solicitor.verified ? "Verified" : "Pending"}
        </span>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <span>{solicitor.location}</span>
        <span>{solicitor.rating} / 5.0 rating</span>
        <span>{solicitor.experience} years experience</span>
        <span>From GBP{solicitor.hourlyRate}/hr</span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{solicitor.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {solicitor.serviceModes.map((mode) => (
          <span key={mode} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {mode}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Link to={`/solicitors/${solicitor.id}`} className="btn-primary">
          View Profile
        </Link>
        <button className="btn-secondary">Save</button>
      </div>
    </article>
  );
}

