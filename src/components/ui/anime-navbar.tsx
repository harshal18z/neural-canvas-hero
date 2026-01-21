"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(defaultActive)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleClick = (item: NavItem) => {
    setActiveTab(item.name)
    // Smooth scroll to section if it's a hash link
    if (item.url.startsWith('#')) {
      const element = document.querySelector(item.url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!mounted) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-[100] pt-6",
        className
      )}
    >
      <motion.div 
        className="flex items-center gap-2 bg-black/50 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <AnimatePresence>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item)
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      duration: 0.6,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-50"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255,255,255,0.3)",
                          "0 0 20px 5px rgba(255,255,255,0.1)",
                          "0 0 0 0 rgba(255,255,255,0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        animate={{
                          translateX: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                <span className="hidden md:inline relative z-10">
                  {item.name}
                </span>
                <span className="md:hidden relative z-10">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
        
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    className="absolute inset-0 -z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div className="absolute inset-0 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        }}
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div className="absolute inset-0 flex justify-center">
                        <motion.span
                          className="w-8 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          animate={{
                            x: ["-200%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5,
                          }}
                        />
                      </motion.div>
                      {hoveredTab && (
                        <>
                          <motion.span
                            className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 text-[8px]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.2, 0.5],
                              y: [0, -10, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ✨
                          </motion.span>
                          <motion.span
                            className="absolute top-1/2 left-1/4 w-4 h-4 -translate-x-1/2 -translate-y-1/2 text-[8px]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.2, 0.5],
                              y: [0, -10, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.5,
                            }}
                          >
                            ✨
                          </motion.span>
                        </>
                      )}
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1/2 h-px -translate-x-1/2"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </nav>
  )
}
