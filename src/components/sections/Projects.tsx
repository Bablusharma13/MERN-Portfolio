"use client";

import { motion } from "framer-motion";
import { Lock, Sparkle } from "lucide-react";
import { projects } from "@/lib/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="A mix of company SaaS platforms and personal builds."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <GlassCard className="group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/50">
                    {project.tagline}
                  </p>
                </div>
                <span
                  className={
                    project.type === "Personal Project"
                      ? "flex shrink-0 items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300"
                      : "flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50"
                  }
                >
                  {project.type === "Personal Project" ? (
                    <Sparkle className="h-3 w-3" />
                  ) : (
                    <Lock className="h-3 w-3" />
                  )}
                  {project.type}
                </span>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {project.description.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2 text-sm leading-relaxed text-white/65"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-white/50"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.links?.github || project.links?.live ? (
                <div className="mt-5 flex gap-3 border-t border-white/10 pt-4">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Code
                    </a>
                  ) : null}
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
                    >
                      Live demo
                    </a>
                  ) : null}
                </div>
              ) : null}

              {project.note ? (
                <p className="mt-2 text-[11px] leading-relaxed text-white/35">
                  {project.note}
                </p>
              ) : null}

              {!project.links?.github && !project.links?.live ? (
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-white/35">
                  {project.type === "Company Project"
                    ? "Private codebase — details available on request."
                    : "Source available on request."}
                </p>
              ) : null}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
