"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap, Code, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ProjectEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface ProjectsTimelineProps {
  title?: string;
  description?: string;
  entries?: ProjectEntry[];
  className?: string;
}

export const defaultProjectEntries: ProjectEntry[] = [
  {
    icon: Package,
    title: "E-Commerce Platform",
    subtitle: "Full-Stack • March 2025",
    description:
      "A comprehensive e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
    items: [
      "React + Next.js frontend with SSR",
      "Node.js backend with GraphQL API",
      "Stripe payment integration",
      "Real-time inventory tracking",
      "Admin dashboard with analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
    button: {
      url: "#",
      text: "View Project",
    },
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    subtitle: "Machine Learning • January 2025",
    description:
      "An AI-powered content generation tool that helps creators produce high-quality articles, social media posts, and marketing copy.",
    items: [
      "GPT-4 integration for content generation",
      "Custom fine-tuned models for specific niches",
      "Multi-language support",
      "SEO optimization suggestions",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
  },
  {
    icon: Palette,
    title: "Design System Library",
    subtitle: "UI/UX • November 2024",
    description:
      "A comprehensive design system with 50+ reusable components, built for scalability and accessibility.",
    items: [
      "50+ accessible React components",
      "Dark and light theme support",
      "Figma design kit included",
      "Comprehensive documentation",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
  },
  {
    icon: Rocket,
    title: "SaaS Dashboard",
    subtitle: "Enterprise • September 2024",
    description:
      "A production-ready SaaS dashboard template with authentication, team management, and billing integration.",
    items: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Subscription billing with Stripe",
      "Team collaboration features",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    button: {
      url: "#",
      text: "View Dashboard",
    },
  },
];

export default function ProjectsTimeline({
  title = "Featured Projects",
  description = "Explore our latest work showcasing innovative solutions across web development, AI, and design systems.",
  entries = defaultProjectEntries,
}: ProjectsTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:gap-6 mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-[42rem] text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 md:gap-0">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const Icon = entry.icon;

            return (
              <div
                key={index}
                aria-current={isActive ? "true" : "false"}
                className="relative"
              >
                {/* Sticky meta column - Hidden on mobile, visible on md+ */}
                <div className="hidden md:flex md:sticky md:top-1/3 md:float-left md:mr-8 md:w-48 flex-col">
                  <div className="flex flex-row items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground scale-110"
                        : "border-border bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {entry.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invisible sentinel */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Content column */}
                <div className={`relative overflow-hidden rounded-2xl border transition-all duration-500 md:ml-56 ${
                  isActive
                    ? "border-primary/50 bg-card shadow-lg shadow-primary/10"
                    : "border-border bg-card/50"
                }`}>
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className={`w-full h-48 md:h-64 object-cover transition-all duration-500 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}
                    />
                  )}
                  <div className="p-4 md:p-6">
                    {/* Mobile header */}
                    <div className="flex md:hidden items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                        <p className="text-xs text-muted-foreground">{entry.subtitle}</p>
                      </div>
                    </div>

                    {/* Desktop header */}
                    <div className="hidden md:block">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {entry.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-muted-foreground mb-4">
                      {entry.description}
                    </p>

                    {/* Expandable content */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="pt-4 border-t border-border">
                        {entry.items && entry.items.length > 0 && (
                          <div className="mb-4">
                            <ul className="space-y-2">
                              {entry.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {entry.button && (
                          <div className="pt-2">
                            <Button asChild variant="outline" size="sm">
                              <a href={entry.button.url} target="_blank" rel="noopener noreferrer">
                                {entry.button.text}
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
