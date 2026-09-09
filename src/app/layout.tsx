import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: `${profile.summary} Ask the built-in AI assistant anything about ${profile.name}'s skills, experience, and projects.`,
  keywords: [
    profile.name,
    "Portfolio",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Next.js",
    "React Developer",
    "Node.js Developer",
  ],
  authors: [{ name: profile.name }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-violet-400/30">
        {children}
      </body>
    </html>
  );
}
