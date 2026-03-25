export function ReviewCard({ review }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{review.title}</h3>
          <p className="mt-1 text-sm text-brand-700">{review.solicitor}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {review.rating} / 5
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600">{review.comment}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">
        {review.recommend ? "Would recommend" : "Would not recommend"}
      </p>
    </article>
  );
}
