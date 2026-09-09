import { GoogleGenAI } from "@google/genai";
import type { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/ai-context";

export const runtime = "nodejs";

const MODEL = "gemini-3.5-flash-lite";
const MAX_TOKENS = 1024;
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY = 12;

// Best-effort per-IP rate limit. Resets whenever the server process restarts,
// which is fine here: the model itself is free, so this isn't about
// blunting a bill anymore — it's about staying under Gemini's free-tier
// request quota. That quota applies per Google Cloud PROJECT (i.e. shared
// across every visitor hitting this one API key), not per caller, and the
// last officially-confirmed number for the flash-lite tier was ~15
// requests/minute — so a generous per-IP allowance could still let a
// handful of concurrent visitors blow through the whole shared budget.
// Keeping this comfortably low leaves headroom for multiple visitors at once.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      "The AI chat isn't configured yet — add GEMINI_API_KEY to your environment to enable it.",
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return new Response("Too many requests — please wait a minute and try again.", {
      status: 429,
    });
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages = incoming
    .slice(-MAX_HISTORY)
    .filter((m) => m && typeof m.content === "string" && m.content.trim())
    .map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as
        | "assistant"
        | "user",
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (messages.length === 0) {
    return new Response("Message cannot be empty.", { status: 400 });
  }

  const client = new GoogleGenAI({ apiKey });
  const encoder = new TextEncoder();

  // Gemini's contents array uses "user"/"model" roles (never "assistant"),
  // and the system prompt goes in config.systemInstruction rather than as a
  // fake turn in the history.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const geminiStream = await client.models.generateContentStream({
          model: MODEL,
          contents,
          config: {
            systemInstruction: buildSystemPrompt(),
            maxOutputTokens: MAX_TOKENS,
          },
        });

        for await (const chunk of geminiStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (error) {
        console.error("Chat API error:", error);
        controller.enqueue(
          encoder.encode("The AI is temporarily unavailable. Please try again shortly."),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
