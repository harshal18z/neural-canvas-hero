import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/ui/neural-network-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ScrollFadeSection } from "@/components/ui/scroll-fade-section";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { AiModelsList } from "@/components/ui/ai-models-preview";
import { TechOrbitSection } from "@/components/ui/tech-orbit-section";
import { Calendar, Code, FileText, User, Clock, Home, Layers, Image, Brain, Cpu, CreditCard, FolderOpen, MessageSquare, Twitter, Linkedin, Github, Mail, Sparkles } from "lucide-react";
import { BentoPricing } from "@/components/ui/bento-pricing";
import ProjectsTimeline from "@/components/ui/projects-timeline";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { Footer } from "@/components/ui/animated-footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Models", url: "#models", icon: Brain },
  { name: "Projects", url: "#projects", icon: FolderOpen },
  { name: "Pricing", url: "#pricing", icon: CreditCard },
];

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

const parallaxImages = [
  { src: '/logos/react.svg', alt: 'React.js' },
  { src: '/logos/typescript.svg', alt: 'TypeScript' },
  { src: '/logos/nodejs.svg', alt: 'Node.js' },
  { src: '/logos/python.svg', alt: 'Python' },
  { src: '/logos/aws.svg', alt: 'AWS' },
  { src: '/logos/docker.svg', alt: 'Docker' },
  { src: '/logos/figma.svg', alt: 'Figma' },
];

const aiModels = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    family: "GPT-4",
    version: "2024-05",
    description: "Most capable multimodal model with vision, audio, and text understanding.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.005,
    outputPricePer1KTokensUSD: 0.015,
    supports: { vision: true, functionCalling: true, streaming: true, jsonMode: true },
    tags: ["multimodal", "flagship"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    family: "Claude 3",
    version: "2024-02",
    description: "Most powerful Claude model for complex analysis and creative tasks.",
    contextWindowTokens: 200000,
    inputPricePer1KTokensUSD: 0.015,
    outputPricePer1KTokensUSD: 0.075,
    supports: { vision: true, functionCalling: true, streaming: true },
    tags: ["reasoning", "creative"],
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    family: "Gemini",
    version: "1.5",
    description: "Advanced multimodal model with long context and efficient processing.",
    contextWindowTokens: 1000000,
    inputPricePer1KTokensUSD: 0.00125,
    outputPricePer1KTokensUSD: 0.005,
    supports: { vision: true, functionCalling: true, streaming: true, audioIn: true },
    tags: ["long-context", "efficient"],
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "Meta",
    family: "Llama 3",
    version: "70B",
    description: "Open-source large language model with strong general capabilities.",
    contextWindowTokens: 8192,
    inputPricePer1KTokensUSD: 0.0009,
    outputPricePer1KTokensUSD: 0.0009,
    supports: { streaming: true, functionCalling: true },
    tags: ["open-source", "versatile"],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    family: "Mistral",
    version: "2",
    description: "European frontier model with excellent multilingual capabilities.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.004,
    outputPricePer1KTokensUSD: 0.012,
    supports: { functionCalling: true, streaming: true, jsonMode: true },
    tags: ["multilingual", "european"],
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    family: "Command",
    version: "R+",
    description: "Enterprise-grade model optimized for RAG and business applications.",
    contextWindowTokens: 128000,
    inputPricePer1KTokensUSD: 0.003,
    outputPricePer1KTokensUSD: 0.015,
    supports: { functionCalling: true, streaming: true, toolUse: true },
    tags: ["enterprise", "RAG"],
  },
];

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-background">
      <AnimeNavBar items={navItems} defaultActive="Home" />
      
      <section id="home">
        <Hero 
          title="Where algorithms become art."
          description="A minimal hero with a neural canvas — crisp, elegant, and quietly expressive. Built with React, Three.js, and a custom CPPN shader."
          badgeText="Generative Surfaces"
          badgeLabel="New"
          ctaButtons={[
            { text: "Get started", href: "#timeline", primary: true },
            { text: "View showcase", href: "#showcase" }
          ]}
          microDetails={["Low‑weight font", "Tight tracking", "Subtle motion"]}
        />
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="w-full bg-background dark:bg-black">
        <ScrollFadeSection className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-extralight text-foreground text-center mb-4">Project Timeline</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Track progress through our orbital visualization. Click on nodes to explore details.
          </p>
        </ScrollFadeSection>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* Zoom Parallax Showcase Section */}
      <section id="showcase" className="w-full bg-background dark:bg-black relative">
        <ScrollFadeSection className="relative h-screen flex items-center justify-center">
          {/* Radial spotlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          
          <div className="text-center z-10">
            <h2 className="text-4xl md:text-5xl font-extralight text-foreground mb-4">
              Visual Showcase
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Scroll Down for Zoom Parallax
            </p>
          </div>
        </ScrollFadeSection>
        
        <ZoomParallax images={parallaxImages} />
      </section>

      {/* AI Models Section */}
      <section id="models" className="w-full bg-background dark:bg-black py-24">
        <ScrollFadeSection className="max-w-7xl mx-auto px-6">
          <AiModelsList models={aiModels} />
        </ScrollFadeSection>
      </section>

      {/* 3D Tech Stack Orbit Section */}
      <section id="tech">
        <TechOrbitSection />
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="w-full bg-background dark:bg-black">
        <ScrollFadeSection className="w-full">
          <ProjectsTimeline />
        </ScrollFadeSection>
      </section>

      {/* Simple Pricing Section */}
      <section id="pricing" className="w-full bg-background dark:bg-black py-24">
        <ScrollFadeSection className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extralight text-foreground mb-4">
              Simple Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Scale as you grow with flexible pricing options.
            </p>
          </div>
          <BentoPricing />
        </ScrollFadeSection>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Footer */}
      <Footer
        brandName="CodeVertex"
        brandDescription="AI-powered design platform for modern creators. Create stunning interfaces optimized for performance and aesthetics."
        socialLinks={[
          { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com", label: "Twitter" },
          { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com", label: "LinkedIn" },
          { icon: <Github className="w-6 h-6" />, href: "https://github.com", label: "GitHub" },
          { icon: <Mail className="w-6 h-6" />, href: "mailto:hello@neuralcanvas.ai", label: "Email" },
        ]}
        navLinks={[
          { label: "Pricing", href: "#pricing" },
          { label: "Projects", href: "#projects" },
          { label: "About", href: "#home" },
          { label: "Contact", href: "mailto:hello@neuralcanvas.ai" },
        ]}
        brandIcon={<Sparkles className="w-12 h-12 text-neutral-800" strokeWidth={1.5} />}
        creatorName="CodeVertex"
        creatorUrl="https://codevertex.ai"
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
