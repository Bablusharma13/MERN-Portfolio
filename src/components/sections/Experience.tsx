"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { experience } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-4 py-24">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description="2+ years shipping full-stack SaaS features end to end."
      />

      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-violet-400/50 via-white/10 to-transparent sm:block" />

        <div className="space-y-8">
          {experience.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative sm:pl-12"
            >
              <span className="absolute left-2.5 top-3 hidden h-3 w-3 rounded-full border-2 border-[#05060a] bg-violet-400 sm:block" />

              <GlassCard className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {role.role}
                    </h3>
                    <p className="text-sm text-white/50">{role.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {role.current ? (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                        Current
                      </span>
                    ) : null}
                    <span className="text-xs text-white/40">
                      {role.period}
                    </span>
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/40">
                  <MapPin className="h-3 w-3" />
                  {role.location}
                </div>

                <ul className="mt-4 space-y-2">
                  {role.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm leading-relaxed text-white/65"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                      {h}
                    </li>
                  ))}
                </ul>

                {role.project ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">
                      {role.project.name}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {role.project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-2 text-xs leading-relaxed text-white/55"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {role.project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-white/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
