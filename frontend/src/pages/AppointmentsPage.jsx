import { useQuery } from "@tanstack/react-query";

import { AppShell } from "../components/AppShell";
import { AppointmentCard } from "../components/AppointmentCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { formatCurrency, formatDateTime } from "../lib/formatters";
import { getAppointments } from "../lib/services";

export function AppointmentsPage() {
  const { isReady } = useAuth();
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    enabled: isReady,
  });

  const items = appointments.map((appointment) => ({
    id: appointment.id,
    solicitor: appointment.solicitor_name || "Solicitor",
    caseTitle: appointment.notes || "Consultation",
    date: formatDateTime(appointment.created_at),
    meetingType: appointment.meeting_type,
    status: appointment.status,
    fee: formatCurrency(appointment.fee_amount),
  }));

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading appointments...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Appointments"
          title="Manage solicitor availability and upcoming consultations"
          description="This screen is now backed by the live appointments API, including consultation fees and status records."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {isLoading ? (
            <div className="panel p-6 text-sm text-slate-600">Loading appointments...</div>
          ) : (
            items.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </main>
    </AppShell>
  );
}
