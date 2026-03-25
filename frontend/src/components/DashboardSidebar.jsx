import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Cases", href: "/cases" },
  { label: "Solicitors", href: "/solicitors" },
  { label: "Messages", href: "/messages" },
  { label: "Appointments", href: "/appointments" },
  { label: "Payments", href: "/payments" },
  { label: "Reviews", href: "/reviews" },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="panel h-fit p-4">
      <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Customer Dashboard
      </p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-brand-700 text-white"
                  : "text-slate-600 hover:scale-105 hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
