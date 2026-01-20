import Hero from "@/components/ui/neural-network-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";

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

const Index = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
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
      
      {/* Timeline Section */}
      <section id="timeline" className="w-full bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-extralight text-white text-center mb-4">Project Timeline</h2>
          <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
            Track progress through our orbital visualization. Click on nodes to explore details.
          </p>
        </div>
        <RadialOrbitalTimeline timelineData={timelineData} />
      </section>
    </div>
  );
};

export default Index;
