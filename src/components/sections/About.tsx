"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Languages, Briefcase } from "lucide-react";
import { profile, education, experience } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const currentRole = experience.find((e) => e.current) ?? experience[0];
const latestEducation = education[0];

const FACTS = [
  { icon: MapPin, label: "Location", value: profile.location },
  {
    icon: Briefcase,
    label: "Experience",
    value: `${profile.yearsExperience} years`,
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: latestEducation.degree,
  },
  {
    icon: Languages,
    label: "Languages",
    value: profile.languages.map((l) => l.name).join(", "),
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeading
        eyebrow="About"
        title="A little about me"
        description="Grounded in shipping real, production SaaS products — not just tutorials."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <GlassCard className="h-full p-8">
            <p className="text-base leading-relaxed text-white/70">
              {profile.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              I care about building things that hold up under real usage —
              multi-tenant systems, secure auth, and background jobs that keep
              running when nobody&apos;s watching. Lately I&apos;ve also been
              leaning on AI-assisted workflows (Claude, Cursor, prompt
              engineering) to move faster without cutting corners on quality.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1.5">
                  <fact.icon className="h-4 w-4 text-violet-300" />
                  <span className="text-xs text-white/40">{fact.label}</span>
                  <span className="text-sm font-medium text-white">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Currently
              </div>
              <p className="text-lg font-semibold text-white">
                {currentRole.role}
              </p>
              <p className="text-sm text-white/50">{currentRole.company}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Building {currentRole.project?.name ?? "product features"} —{" "}
                {currentRole.highlights[0]}
              </p>
            </div>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Connect on LinkedIn
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
