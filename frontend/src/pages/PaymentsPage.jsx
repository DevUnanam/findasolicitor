import { AppShell } from "../components/AppShell";
import { PaymentCard } from "../components/PaymentCard";
import { SectionHeading } from "../components/SectionHeading";
import { payments } from "../features/payments/mockData";

export function PaymentsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Payments"
          title="Track consultation fees, retainers, and billing history"
          description="The billing workspace is structured to support a future Stripe integration while already looking like a credible product surface."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}

