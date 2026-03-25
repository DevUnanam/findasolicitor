const navItems = [
  "Overview",
  "Cases",
  "Solicitors",
  "Messages",
  "Appointments",
  "Payments",
  "Reviews",
];

export function DashboardSidebar() {
  return (
    <aside className="panel h-fit p-4">
      <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Customer Dashboard
      </p>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
              item === "Overview"
                ? "bg-brand-700 text-white"
                : "text-slate-600 hover:scale-105 hover:bg-brand-50 hover:text-brand-800"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
