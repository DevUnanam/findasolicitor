export function StatCard({ label, value, helper }) {
  return (
    <div className="panel p-5 transition-all duration-200 hover:scale-105 hover:shadow-lg">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-brand-700">{helper}</p>
    </div>
  );
}

