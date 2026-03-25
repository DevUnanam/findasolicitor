import { AppShell } from "../components/AppShell";
import { AppointmentCard } from "../components/AppointmentCard";
import { SectionHeading } from "../components/SectionHeading";
import { appointments } from "../features/appointments/mockData";

export function AppointmentsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Appointments"
          title="Manage solicitor availability and upcoming consultations"
          description="This final-phase booking surface gives the platform a more complete service-delivery layer with appointment status, meeting type, and fee context."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}

