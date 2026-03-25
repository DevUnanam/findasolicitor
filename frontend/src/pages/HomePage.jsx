import { AppShell } from "../components/AppShell";
import { SectionHeading } from "../components/SectionHeading";
import { StatCard } from "../components/StatCard";

const features = [
  {
    title: "Smart Solicitor Matching",
    text: "Match clients to the right solicitor using legal-need intake, location, availability, and verification status.",
  },
  {
    title: "Case Collaboration",
    text: "Track matters with case statuses, secure file sharing, solicitor responses, and timeline visibility.",
  },
  {
    title: "Professional Messaging",
    text: "Built for trusted conversations with real-time chat, appointment context, and clear conversation history.",
  },
];

const solicitorCards = [
  { name: "Elaine Foster", specialty: "Family Law", rating: "4.9", location: "London" },
  { name: "Daniel Webb", specialty: "Immigration", rating: "4.8", location: "Manchester" },
  { name: "Sophie Carter", specialty: "Property Law", rating: "4.7", location: "Birmingham" },
];

export function HomePage() {
  return (
    <AppShell>
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Legal Services Marketplace</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find the right solicitor with confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Findasolicitor connects customers to qualified legal professionals through verified profiles,
                structured case management, secure messaging, appointments, and transparent reviews.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#solicitors" className="btn-primary">Find a Solicitor</a>
                <a href="#dashboard" className="btn-secondary">View Dashboard</a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <StatCard label="Verified Solicitors" value="240+" helper="Reviewed by admin workflows" />
                <StatCard label="Cases Managed" value="1.8k" helper="Structured status tracking" />
                <StatCard label="Client Satisfaction" value="96%" helper="Ratings and reviews built in" />
              </div>
            </div>
            <div className="panel-muted p-6 lg:p-8">
              <div className="rounded-xl border border-brand-200 bg-white p-5">
                <p className="text-sm font-semibold text-brand-700">Quick Match Intake</p>
                <div className="mt-5 space-y-4">
                  {["Legal issue", "Preferred location", "Urgency", "Budget range"].map((field) => (
                    <div key={field}>
                      <p className="mb-2 text-sm font-medium text-slate-700">{field}</p>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                        {field}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-primary mt-6 w-full">Get Matches</button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Platform Strengths"
            title="Built for trust, structure, and legal service clarity"
            description="The product balances recruiter-friendly polish with realistic workflows for a modern legal-tech marketplace."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="panel p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solicitors" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured Solicitors"
              title="Professional profiles with verification and social proof"
              description="Every solicitor card is designed to surface the signals that help clients make informed decisions."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {solicitorCards.map((solicitor) => (
                <article key={solicitor.name} className="panel p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{solicitor.name}</h3>
                      <p className="mt-1 text-sm text-brand-700">{solicitor.specialty}</p>
                    </div>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
                      Verified
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
                    <span>{solicitor.location}</span>
                    <span>{solicitor.rating} / 5.0</span>
                  </div>
                  <button className="btn-secondary mt-6 w-full">View Profile</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Role-Based Experience"
            title="Dashboards for customers, solicitors, and admins"
            description="Each role gets a structured workspace for the responsibilities that matter most."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              "Customer: cases, saved solicitors, messages, appointments, payments",
              "Solicitor: assigned matters, availability, earnings, reviews, verification",
              "Admin: user oversight, solicitor approvals, moderation, reporting",
            ].map((text) => (
              <div key={text} className="panel p-6">
                <p className="text-base font-medium leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

