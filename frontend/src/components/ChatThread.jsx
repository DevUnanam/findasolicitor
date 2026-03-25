import { useState } from "react";

import { formatDateTime } from "../lib/formatters";

export function ChatThread({ conversation, onSendMessage, isSending }) {
  const [draft, setDraft] = useState("");

  if (!conversation) {
    return (
      <div className="panel flex min-h-[640px] items-center justify-center p-10 text-center">
        <div>
          <p className="text-lg font-semibold text-slate-900">No conversation selected</p>
          <p className="mt-3 text-sm text-slate-600">Choose a thread to review case-linked messages and continue the discussion.</p>
        </div>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }
    onSendMessage(draft, () => setDraft(""));
  }

  return (
    <div className="panel flex min-h-[640px] flex-col overflow-hidden">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Active Thread</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{conversation.participant}</h2>
            <p className="mt-2 text-sm text-slate-600">{conversation.subject} • {conversation.caseTitle}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Secure case messaging
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 bg-brand-50 px-6 py-6">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.own ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xl rounded-2xl px-4 py-3 text-sm shadow-soft ${
                message.own
                  ? "bg-brand-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${message.own ? "text-brand-100" : "text-slate-400"}`}>
                {message.sender}
              </p>
              <p className="mt-2 leading-7">{message.text}</p>
              <p className={`mt-3 text-right text-xs ${message.own ? "text-brand-100" : "text-slate-400"}`}>
                {formatDateTime(message.time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-white p-5">
        <form className="rounded-2xl border border-slate-200 bg-slate-50 p-4" onSubmit={handleSubmit}>
          <textarea
            rows="3"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-full resize-none bg-transparent text-sm text-slate-700 outline-none"
            placeholder="Write a secure message to continue this case conversation."
          />
          <div className="mt-4 flex items-center justify-between">
            <button type="button" className="btn-secondary">Attach File</button>
            <button className="btn-primary" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
