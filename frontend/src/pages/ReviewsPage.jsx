import { AppShell } from "../components/AppShell";
import { ReviewCard } from "../components/ReviewCard";
import { SectionHeading } from "../components/SectionHeading";
import { reviews } from "../features/reviews/mockData";

export function ReviewsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="Capture client feedback and visible trust signals"
          description="Ratings and review content reinforce solicitor credibility and create a realistic feedback loop for the marketplace."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
