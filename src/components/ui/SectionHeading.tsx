"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="text-xs font-mono font-medium uppercase tracking-[0.3em] text-violet-300/80">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-white/60">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
