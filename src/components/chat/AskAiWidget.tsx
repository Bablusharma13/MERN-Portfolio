"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUp, Loader2 } from "lucide-react";
import { profile } from "@/lib/profile";
import { useChatWidget } from "./ChatWidgetContext";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What are Bablu's strongest skills?",
  "Tell me about the MarketXY project.",
  "Is he open to full-time roles?",
];

export function AskAiWidget() {
  const { isOpen, openChat, closeChat, pendingPrompt, consumePendingPrompt } =
    useChatWidget();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm an AI assistant trained on ${profile.name}'s resume. Ask me about his skills, experience, or projects.`,
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && pendingPrompt) {
      consumePendingPrompt();
      void sendMessage(pendingPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isStreaming]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "The AI assistant is unavailable right now.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: last.content + chunk,
          };
          return updated;
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="ask-ai-trigger"
            type="button"
            onClick={() => openChat()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            aria-label="Ask AI about me"
            className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.7)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-5 sm:py-3.5"
          >
            <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden text-sm font-medium sm:inline">
              Ask AI about me
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="nav-glass fixed bottom-0 right-0 z-50 flex h-[85vh] w-full flex-col rounded-t-3xl sm:bottom-6 sm:right-6 sm:h-[32rem] sm:w-96 sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Ask my AI twin
                </p>
                <p className="text-xs text-white/50">
                  Trained on {profile.name}&apos;s resume
                </p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={
                    message.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white/8 px-4 py-2.5 text-sm text-white/90"
                    }
                  >
                    {message.content || (
                      <Loader2 className="h-4 w-4 animate-spin text-white/50" />
                    )}
                  </div>
                </div>
              ))}
              {error ? (
                <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </p>
              ) : null}

              {messages.length <= 1 && !isStreaming ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void sendMessage(s)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Bablu…"
                disabled={isStreaming}
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-violet-400/50 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
