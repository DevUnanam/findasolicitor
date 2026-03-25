import { Link } from "react-router-dom";

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-extrabold tracking-tight text-brand-800">
            Findasolicitor
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="transition-all duration-200 hover:text-brand-700">Services</a>
            <a href="#solicitors" className="transition-all duration-200 hover:text-brand-700">Solicitors</a>
            <a href="#dashboard" className="transition-all duration-200 hover:text-brand-700">Dashboard</a>
            <Link to="/dashboard" className="btn-primary">Open Demo</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

