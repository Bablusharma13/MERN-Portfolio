"use client";

import { motion } from "framer-motion";

// Soft, animated gradient blobs used as the site's ambient backdrop.
// Kept to CSS/transform animation (no canvas/WebGL) so it stays cheap on
// low-end devices while still giving the page a premium, alive feel.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05060a]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />

      <motion.div
        className="absolute -left-40 top-[-10%] h-[32rem] w-[32rem] rounded-full bg-violet-600/30 blur-[120px]"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-[120px]"
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[20%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[130px]"
        animate={{ x: [0, 25, -25, 0], y: [0, -15, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(5,6,10,0.6),#05060a)]" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
