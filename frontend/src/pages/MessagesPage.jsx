import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "../components/AppShell";
import { ChatThread } from "../components/ChatThread";
import { ConversationList } from "../components/ConversationList";
import { SectionHeading } from "../components/SectionHeading";
import { useAuth } from "../features/auth/AuthProvider";
import { markConversationRead, getConversations, sendMessage } from "../lib/services";

export function MessagesPage() {
  const { isReady, user } = useAuth();
  const queryClient = useQueryClient();
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    enabled: isReady,
    refetchInterval: 10000,
  });
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!activeId && conversations.length > 0) {
      setActiveId(conversations[0].id);
    }
  }, [activeId, conversations]);

  const activeConversation = useMemo(() => {
    const conversation = conversations.find((item) => item.id === activeId);
    if (!conversation) {
      return null;
    }

    const otherParticipant = (conversation.participant_details || []).find((participant) => participant.id !== user?.id);

    return {
      id: conversation.id,
      participant: otherParticipant?.name || "Conversation participant",
      caseTitle: conversation.case_title || "General conversation",
      subject: conversation.subject || "Secure conversation",
      messages: (conversation.messages || []).map((message) => ({
        id: message.id,
        sender: message.sender_name,
        own: message.sender === user?.id,
        text: message.content,
        time: message.created_at,
      })),
    };
  }, [activeId, conversations, user?.id]);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  useEffect(() => {
    if (activeId) {
      markConversationRead(activeId).then(() => {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      });
    }
  }, [activeId, queryClient]);

  const listItems = conversations.map((conversation) => ({
    id: conversation.id,
    participant: (conversation.participant_details || []).find((item) => item.id !== user?.id)?.name || conversation.subject || `Conversation #${conversation.id}`,
    role: (conversation.participant_details || []).find((item) => item.id !== user?.id)?.role || "General",
    caseTitle: conversation.case_title || "General support",
    unread: conversation.unread_count || 0,
    lastSeen: conversation.last_message_at || conversation.updated_at,
    messages: [],
  }));

  function handleSendMessage(content, resetDraft) {
    if (!activeConversation) {
      return;
    }
    sendMessageMutation.mutate(
      {
        conversation: activeConversation.id,
        content,
      },
      {
        onSuccess: () => resetDraft(),
      },
    );
  }

  if (!isReady) {
    return (
      <AppShell>
        <main className="mx-auto max-w-7xl px-4 py-16 text-sm text-slate-600 sm:px-6 lg:px-8">
          Loading messaging workspace...
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Secure Messaging"
          title="Case-linked conversations with a clean, professional chat workflow"
          description="This workspace now uses the live Django conversation and message APIs, including unread tracking and send-message mutations."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[360px_1fr]">
          <ConversationList conversations={listItems} activeId={activeId} onSelect={setActiveId} />
          {isLoading ? (
            <div className="panel p-6 text-sm text-slate-600">Loading conversations...</div>
          ) : (
            <ChatThread conversation={activeConversation} onSendMessage={handleSendMessage} isSending={sendMessageMutation.isPending} />
          )}
        </div>
      </main>
    </AppShell>
  );
}
