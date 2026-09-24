import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

// Without this, Next.js treats the route as a static, predictable value and
// bakes in whatever `new Date()` resolved to at the first build — the date
// then goes stale across every later deploy since the cached output is reused.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
