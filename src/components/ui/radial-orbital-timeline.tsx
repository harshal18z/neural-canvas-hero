"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-primary-foreground bg-primary border-primary";
      case "in-progress":
        return "text-primary bg-primary-foreground border-primary";
      case "pending":
        return "text-muted-foreground bg-muted border-muted-foreground/50";
      default:
        return "text-muted-foreground bg-muted border-muted-foreground/50";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] bg-background dark:bg-black overflow-hidden"
      onClick={handleContainerClick}
    >
      <div
        ref={orbitRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Orbital rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-foreground/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-foreground/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-foreground/5" />

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full shadow-[0_0_20px_hsl(var(--foreground)/0.5)]" />

        {/* Timeline nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          const nodeStyle = {
            transform: `translate(${position.x}px, ${position.y}px)`,
            zIndex: isExpanded ? 200 : position.zIndex,
            opacity: isExpanded ? 1 : position.opacity,
          };

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute transition-all duration-700 cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Connection line to center */}
              <div
                className={`absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-foreground/20 to-transparent origin-left transition-all duration-500 ${
                  isExpanded || isRelated ? "opacity-100" : "opacity-30"
                }`}
                style={{
                  width: `${Math.sqrt(position.x ** 2 + position.y ** 2)}px`,
                  transform: `rotate(${Math.atan2(-position.y, -position.x)}rad)`,
                }}
              />

              {/* Node circle */}
              <div
                className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isExpanded
                    ? "scale-125 bg-foreground text-background border-foreground"
                    : isRelated
                    ? "scale-110 bg-foreground/20 text-foreground border-foreground/50"
                    : "bg-background text-foreground border-foreground/30 hover:border-foreground/60"
                } ${isPulsing ? "animate-pulse" : ""}`}
              >
                <Icon className="w-5 h-5" />
                {isPulsing && (
                  <div className="absolute inset-0 rounded-full border-2 border-foreground animate-ping" />
                )}
              </div>

              {/* Node label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-14 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                  isExpanded ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <Card className="absolute left-16 top-1/2 -translate-y-1/2 w-72 bg-background/90 dark:bg-black/90 border-border backdrop-blur-lg">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="outline"
                        className={getStatusStyles(item.status)}
                      >
                        {item.status === "completed"
                          ? "COMPLETE"
                          : item.status === "in-progress"
                          ? "IN PROGRESS"
                          : "PENDING"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{item.content}</p>

                    {/* Energy bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Energy Level
                        </span>
                        <span className="text-foreground">{item.energy}%</span>
                      </div>
                      <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-foreground/50 to-foreground rounded-full transition-all duration-500"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {/* Related nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <Link className="w-3 h-3" />
                          <span>Connected Nodes</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find(
                              (i) => i.id === relatedId
                            );
                            return (
                              <Button
                                key={relatedId}
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleItem(relatedId);
                                }}
                              >
                                {relatedItem?.title}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
