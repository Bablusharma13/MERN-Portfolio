"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Sparkles, Check, Copy } from "lucide-react";
import { profile } from "@/lib/profile";
import { GlassCard } from "@/components/ui/GlassCard";
import { useChatWidget } from "@/components/chat/ChatWidgetContext";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Contact() {
  const { openChat } = useChatWidget();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — no-op.
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="relative overflow-hidden p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)]" />

          <span className="text-xs font-mono font-medium uppercase tracking-[0.3em] text-violet-300/80">
            Contact
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Let&apos;s build something great
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60">
            {profile.availability}. Reach out directly, or ask my AI assistant
            anything first.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {copied ? "Copied!" : profile.contact.email}
              {!copied ? <Copy className="h-3.5 w-3.5 text-white/40" /> : null}
            </button>

            <a
              href={`tel:${profile.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {profile.contact.phone}
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <button
            type="button"
            onClick={() => openChat()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Ask AI about me
          </button>
        </GlassCard>
      </motion.div>
    </section>
  );
}
