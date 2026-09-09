# Bablu Kumar — Portfolio

Personal portfolio built with Next.js (App Router), Tailwind CSS, and Framer
Motion, featuring an AI chat widget (powered by the free Google Gemini API)
that answers visitor questions using content pulled straight from the resume
data.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Enabling the AI chat widget

The "Ask AI about me" widget calls `/api/chat`, which talks to the Google
Gemini API. Without a key it still renders, but replies with a friendly "not
configured yet" message.

1. Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey)
   (no credit card required for the free tier).
2. Copy `.env.example` to `.env.local` and paste the key in:
   ```bash
   cp .env.example .env.local
   ```
3. Restart `npm run dev`.

The chat is grounded in `src/lib/profile.ts` (via `src/lib/ai-context.ts`), so
it only answers using the real resume content — update that file and the
chatbot's knowledge updates with it.

Cost note: the endpoint uses `gemini-3.5-flash-lite`, which runs on Gemini's
**free tier** — no billing required. Google's free-tier request quotas apply
per Google Cloud project (i.e. shared across every visitor hitting your key),
not per visitor, and the last officially-confirmed ballpark for this
flash-lite tier was around 15 requests/minute and 1,000 requests/day (Google
no longer publishes a fixed number — check your live limits at
[aistudio.google.com/rate-limit](https://aistudio.google.com/rate-limit)).
The in-memory per-IP rate limit in `src/app/api/chat/route.ts` (`RATE_LIMIT`,
currently 5 requests/min per IP) is tuned to stay comfortably under that
shared budget even with a few concurrent visitors. If you expect heavier
traffic, consider swapping the model in `src/app/api/chat/route.ts` (`MODEL`
constant) — e.g. `gemini-2.5-flash-lite` is another confirmed free-tier
option — or adding a proper distributed rate limiter (e.g. Upstash Redis)
instead of the in-memory one here.

## Editing content

All portfolio content (name, bio, skills, experience, projects, education,
contact links) lives in one place: `src/lib/profile.ts`. Edit it and every
section — plus the AI chat's knowledge — updates automatically.

## Adding your resume PDF

Drop your resume file at `public/resume.pdf` — the Resume buttons already
link there.

## Project structure

```
src/
  app/
    api/chat/route.ts     # Streaming Claude API endpoint
    layout.tsx             # Root layout, fonts, metadata
    page.tsx                # Assembles all sections
  components/
    background/             # Animated aurora backdrop
    chat/                    # AI chat widget + shared open/close context
    layout/                  # Navbar, Footer
    sections/                # Hero, About, Skills, Experience, Projects, Contact
    ui/                      # GlassCard, SectionHeading
  lib/
    profile.ts               # All resume content (single source of truth)
    ai-context.ts             # Builds the AI system prompt from profile.ts
```

## Deploying

This is a standard Next.js app — deploys to [Vercel](https://vercel.com) with
zero config. Remember to set `ANTHROPIC_API_KEY` in the project's environment
variables there too.
