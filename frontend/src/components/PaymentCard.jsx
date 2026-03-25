export function PaymentCard({ payment }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{payment.description}</h3>
          <p className="mt-1 text-sm text-brand-700">{payment.solicitor}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "Paid" ? "bg-brand-100 text-brand-800" : "bg-amber-100 text-amber-800"}`}>
          {payment.status}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>{payment.date}</span>
        <span className="font-semibold text-slate-900">{payment.amount}</span>
      </div>
    </article>
  );
}

