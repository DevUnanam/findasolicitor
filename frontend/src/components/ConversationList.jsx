export function ConversationList({ conversations, activeId, onSelect }) {
  return (
    <div className="panel p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Conversations</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{conversations.length} active threads</h2>
        </div>
      </div>

      <div className="space-y-3">
        {conversations.map((conversation) => {
          const active = conversation.id === activeId;
          return (
            <button
              key={conversation.id}
              onClick={() => onSelect(conversation.id)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                active
                  ? "border-brand-300 bg-brand-50 shadow-soft"
                  : "border-slate-200 bg-white hover:scale-[1.01] hover:border-brand-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{conversation.participant}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{conversation.role}</p>
                </div>
                {conversation.unread > 0 ? (
                  <span className="rounded-full bg-brand-700 px-2.5 py-1 text-xs font-semibold text-white">
                    {conversation.unread}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm font-medium text-brand-700">{conversation.subject}</p>
              <p className="mt-2 text-sm text-slate-500">{conversation.caseTitle}</p>
              <p className="mt-2 text-xs text-slate-400">{conversation.lastSeen}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

