"use client";
import React from "react";
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
        <div className="flex flex-col items-center text-center gap-8 mb-16">
          {/* Brand name */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {brandName}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl">
            {brandDescription}
          </p>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          )}

          {/* Nav links */}
          {navLinks.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-base text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
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
