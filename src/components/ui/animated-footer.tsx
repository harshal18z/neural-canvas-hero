"use client";
import React from "react";
import { motion } from "framer-motion";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "w-full relative bg-neutral-950 text-white pt-20 pb-6 overflow-hidden min-h-[600px]",
        className
      )}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered content */}
        <motion.div 
          className="flex flex-col items-center text-center gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Brand name */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            {brandName}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl"
            variants={fadeUpVariants}
            transition={{ duration: 0.5 }}
          >
            {brandDescription}
          </motion.p>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <motion.div 
              className="flex items-center justify-center gap-6"
              variants={fadeUpVariants}
              transition={{ duration: 0.5 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Nav links */}
          {navLinks.length > 0 && (
            <motion.nav 
              className="flex flex-wrap items-center justify-center gap-8"
              variants={fadeUpVariants}
              transition={{ duration: 0.5 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-base text-neutral-400 hover:text-white transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </motion.div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[18vw] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-t from-white/[0.04] to-transparent whitespace-nowrap">
          {brandName.toUpperCase()}
        </span>
      </div>

      {/* Centered logo icon */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl scale-150" />
          {/* Icon container */}
          <div className="relative bg-gradient-to-b from-neutral-800 to-neutral-900 p-6 rounded-3xl border border-white/10 shadow-2xl">
            <div className="bg-gradient-to-b from-white to-neutral-200 p-4 rounded-2xl">
              {brandIcon || (
                <NotepadTextDashed className="w-12 h-12 text-neutral-800" strokeWidth={1.5} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              ©{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>

            {creatorName && creatorUrl && (
              <a
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 hover:text-white transition-colors duration-300"
              >
                Crafted by {creatorName}
              </a>
            )}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </footer>
  );
};
