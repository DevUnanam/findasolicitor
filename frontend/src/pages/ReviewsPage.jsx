import { useQuery } from "@tanstack/react-query";

import { AppShell } from "../components/AppShell";
import { ReviewCard } from "../components/ReviewCard";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { getReviews } from "../lib/services";

export function ReviewsPage() {
  const { isReady } = useAuth();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
    enabled: isReady,
  });

  const items = reviews.map((review) => ({
    id: review.id,
    solicitor: review.solicitor_name,
    title: review.title || "Review",
    rating: review.rating,
    comment: review.comment,
    recommend: review.would_recommend,
  }));

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading reviews...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Reviews"
          title="Capture client feedback and visible trust signals"
          description="This page now reads directly from the live reviews API and shows actual historical client feedback records."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {isLoading ? (
            <div className="panel p-6 text-sm text-slate-600">Loading reviews...</div>
          ) : (
            items.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </main>
    </AppShell>
  );
}
