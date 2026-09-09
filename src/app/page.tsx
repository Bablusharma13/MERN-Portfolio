import { AuroraBackground } from "@/components/background/AuroraBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { ChatWidgetProvider } from "@/components/chat/ChatWidgetContext";
import { AskAiWidget } from "@/components/chat/AskAiWidget";

export default function Home() {
  return (
    <ChatWidgetProvider>
      <AuroraBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <AskAiWidget />
    </ChatWidgetProvider>
  );
}
