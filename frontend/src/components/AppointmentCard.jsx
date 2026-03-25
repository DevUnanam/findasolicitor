export function AppointmentCard({ appointment }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-200 hover:scale-[1.01]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{appointment.solicitor}</h3>
          <p className="mt-1 text-sm text-brand-700">{appointment.caseTitle}</p>
        </div>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
          {appointment.status}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p>{appointment.date}</p>
        <p>{appointment.meetingType}</p>
        <p>{appointment.fee}</p>
      </div>
    </article>
  );
}

