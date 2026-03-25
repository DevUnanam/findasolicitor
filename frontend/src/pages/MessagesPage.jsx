import { useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { ChatThread } from "../components/ChatThread";
import { ConversationList } from "../components/ConversationList";
import { SectionHeading } from "../components/SectionHeading";
import { conversations } from "../features/messaging/mockData";

export function MessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? null);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId),
    [activeId],
  );

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Secure Messaging"
          title="Case-linked conversations with a clean, professional chat workflow"
          description="Phase 5 brings the messaging experience into the product proper, with conversation summaries, unread context, and a composed legal-tech chat layout."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[360px_1fr]">
          <ConversationList conversations={conversations} activeId={activeId} onSelect={setActiveId} />
          <ChatThread conversation={activeConversation} />
        </div>
      </main>
    </AppShell>
  );
}
