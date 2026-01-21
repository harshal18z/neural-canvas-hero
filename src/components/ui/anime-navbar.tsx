"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Moon, Sun } from "lucide-react"
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
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    setMounted(true)
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (systemPrefersDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
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
    if (item.url.startsWith('#')) {
      const element = document.querySelector(item.url)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
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
        className="flex items-center gap-2 bg-background/50 dark:bg-black/50 border border-border dark:border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg"
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
                  "relative cursor-pointer text-sm font-semibold px-4 md:px-6 py-3 rounded-full transition-all duration-300",
                  "text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white",
                  isActive && "text-foreground dark:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-foreground/10 dark:bg-white/10 rounded-full -z-10"
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
                          "0 0 0 0 rgba(var(--foreground),0.3)",
                          "0 0 20px 5px rgba(var(--foreground),0.1)",
                          "0 0 0 0 rgba(var(--foreground),0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
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
                      className="absolute inset-0 bg-foreground/5 dark:bg-white/5 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>
              </a>
            )
          })}
        </AnimatePresence>

        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full",
            "text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white",
            "transition-colors duration-300"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </nav>
  )
}
