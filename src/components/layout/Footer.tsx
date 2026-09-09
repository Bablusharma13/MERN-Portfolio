import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-10 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with Next.js, Tailwind CSS &amp; Claude.</p>
      </div>
    </footer>
  );
}
