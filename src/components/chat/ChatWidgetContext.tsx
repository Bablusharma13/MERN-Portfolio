"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type ChatWidgetContextValue = {
  isOpen: boolean;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  pendingPrompt: string | null;
  consumePendingPrompt: () => void;
};

const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const value = useMemo<ChatWidgetContextValue>(
    () => ({
      isOpen,
      openChat: (initialPrompt) => {
        if (initialPrompt) setPendingPrompt(initialPrompt);
        setIsOpen(true);
      },
      closeChat: () => setIsOpen(false),
      pendingPrompt,
      consumePendingPrompt: () => setPendingPrompt(null),
    }),
    [isOpen, pendingPrompt],
  );

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) {
    throw new Error("useChatWidget must be used within a ChatWidgetProvider");
  }
  return ctx;
}
