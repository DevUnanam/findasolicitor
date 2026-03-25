import { useQuery } from "@tanstack/react-query";

import { AppShell } from "../components/AppShell";
import { PaymentCard } from "../components/PaymentCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { formatCurrency, formatDateTime } from "../lib/formatters";
import { getPayments } from "../lib/services";

export function PaymentsPage() {
  const { isReady } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    enabled: isReady,
  });

  const items = payments.map((payment) => ({
    id: payment.id,
    description: payment.description || payment.case_title || "Payment",
    solicitor: payment.solicitor_name || "Solicitor",
    amount: formatCurrency(payment.amount, payment.currency),
    status: payment.status,
    date: formatDateTime(payment.paid_at || payment.created_at),
  }));

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading payments...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Payments"
          title="Track consultation fees, retainers, and billing history"
          description="The billing workspace now consumes the live Django payments API and shows actual seeded transaction records."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {isLoading ? (
            <div className="panel p-6 text-sm text-slate-600">Loading payments...</div>
          ) : (
            items.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          )}
        </div>
      </main>
    </AppShell>
  );
}
