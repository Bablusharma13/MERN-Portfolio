import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, projects } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const avatarData = await readFile(join(process.cwd(), "public/avatar.jpg"), "base64");
const avatarSrc = `data:image/jpeg;base64,${avatarData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b0d14 0%, #1a1030 45%, #0b0d14 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "#7c3aed",
            opacity: 0.35,
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            right: -80,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "#22d3ee",
            opacity: 0.22,
            filter: "blur(10px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          {/* next/image can't run inside next/og's Satori renderer — a plain <img> is required here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            width={220}
            height={220}
            style={{
              borderRadius: 48,
              objectFit: "cover",
              border: "4px solid rgba(255,255,255,0.15)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#c4b5fd",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {profile.availability}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.05,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 40,
                fontWeight: 600,
                color: "#e9d5ff",
                marginTop: 12,
              }}
            >
              {profile.tagline}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 56,
          }}
        >
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "18px 28px",
              }}
            >
              <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#fff" }}>
                {stat.value}
              </div>
              <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.55)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {projects.slice(0, 3).map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                fontSize: 22,
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
