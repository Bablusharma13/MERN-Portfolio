"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, FileDown, Mail } from "lucide-react";
import { profile } from "@/lib/profile";
import { useChatWidget } from "@/components/chat/ChatWidgetContext";

export function Hero() {
  const { openChat } = useChatWidget();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-32 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {profile.availability}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative mb-6 h-28 w-28 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-cyan-400/20 shadow-[0_0_60px_-10px_rgba(168,85,247,0.6)] sm:h-32 sm:w-32"
      >
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          fill
          priority
          sizes="128px"
          className="object-cover"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg font-medium text-white/70"
      >
        Hey, I&apos;m
      </motion.h2>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-1 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gradient mt-3 text-xl font-semibold sm:text-2xl"
      >
        {profile.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-5 max-w-xl text-center text-base leading-relaxed text-white/60"
      >
        {profile.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#projects"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
        >
          View Projects
        </a>
        <button
          type="button"
          onClick={() => openChat()}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <Sparkles className="h-4 w-4" />
          Ask AI about me
        </button>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <FileDown className="h-4 w-4" />
          Resume
        </a>
        <a
          href={`mailto:${profile.contact.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <Mail className="h-4 w-4" />
          Contact
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.75 }}
        className="mt-16 grid w-full max-w-xl grid-cols-3 gap-3"
      >
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-2xl px-3 py-5 text-center"
          >
            <p className="text-2xl font-bold text-white sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
