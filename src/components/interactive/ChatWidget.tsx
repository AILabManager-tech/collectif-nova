"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING_FR =
  "Bonjour! Je suis l'assistante virtuelle de L'Usine RH. Je peux vous faire un diagnostic RH rapide en 5 questions, ou répondre à vos questions sur les ressources humaines en PME. Comment puis-je vous aider?";

const GREETING_EN =
  "Hello! I'm the virtual assistant for HR Factory. I can run a quick HR diagnostic in 5 questions, or answer your questions about HR for SMBs. How can I help?";

export function ChatWidget() {
  const locale = useLocale();
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: locale === "en" ? GREETING_EN : GREETING_FR,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [open, messages, scrollToBottom]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, locale }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as { message: string };
      setMessages([...updated, { role: "assistant", content: data.message }]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content:
            locale === "en"
              ? "Sorry, I encountered an error. Please try again or contact Émilie directly."
              : "Désolée, une erreur est survenue. Veuillez réessayer ou contacter Émilie directement.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function formatMessage(text: string) {
    return text.split("\n").map((line, i) => {
      // Bold
      const formatted = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      );
      return (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: formatted }}
          className="block"
        />
      );
    });
  }

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sage-600 text-white shadow-lg transition-colors hover:bg-sage-700"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("toggle")}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-sage-600 px-5 py-4 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm">
                💬
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{t("title")}</p>
                <p className="text-xs text-sage-200">{t("subtitle")}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 transition-colors hover:bg-white/10"
                aria-label={t("close")}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-sage-600 text-white"
                          : "rounded-bl-md bg-cream-400 text-charcoal"
                      }`}
                    >
                      {formatMessage(msg.content)}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-cream-400 px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-taupe [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-taupe [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-taupe [animation-delay:300ms]" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-cream-400 px-4 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-cream-500 bg-cream-200 px-4 py-2.5 text-sm text-charcoal placeholder-taupe outline-none transition-colors focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-600 text-white transition-all hover:bg-sage-700 disabled:opacity-40 disabled:hover:bg-sage-600"
                  aria-label={t("send")}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
