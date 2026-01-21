import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/ui/neural-network-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ScrollFadeSection } from "@/components/ui/scroll-fade-section";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { Calendar, Code, FileText, User, Clock, Home, Layers, Image } from "lucide-react";

const navItems = [
  { name: "Home", url: "#home", icon: Home },
  { name: "Timeline", url: "#timeline", icon: Layers },
  { name: "Showcase", url: "#showcase", icon: Image },
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
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Modern architecture building',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Urban cityscape at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Abstract geometric pattern',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Minimalist design elements',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Ocean waves and beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Forest trees and sunlight',
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
    <div className="w-full min-h-screen flex flex-col">
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
      <section id="timeline" className="w-full bg-black">
        <ScrollFadeSection className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-extralight text-white text-center mb-4">Project Timeline</h2>
          <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
            Track progress through our orbital visualization. Click on nodes to explore details.
          </p>
        </ScrollFadeSection>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>

      {/* Zoom Parallax Showcase Section */}
      <section id="showcase" className="w-full bg-black relative">
        <ScrollFadeSection className="relative h-screen flex items-center justify-center">
          {/* Radial spotlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          
          <div className="text-center z-10">
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">
              Visual Showcase
            </h2>
            <p className="text-white/60 text-lg font-light">
              Scroll Down for Zoom Parallax
            </p>
          </div>
        </ScrollFadeSection>
        
        <ZoomParallax images={parallaxImages} />
      </section>
    </div>
  );
};

export default Index;
