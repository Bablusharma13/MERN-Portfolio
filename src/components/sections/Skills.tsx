"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I build with"
        description="A practical, production-tested toolkit across the full stack."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <GlassCard className="h-full p-6 transition-colors hover:bg-white/[0.06]">
              <h3 className="text-sm font-semibold text-white">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
