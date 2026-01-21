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
        "w-full relative bg-neutral-950 text-white pt-20 pb-4 overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-12 mb-16">
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="space-y-6 max-w-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                    {brandName}
                  </span>
                </div>
              </div>

              <p className="text-base text-neutral-400 leading-relaxed">
                {brandDescription}
              </p>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden border border-white/5 hover:border-white/10"
                  >
                    <div className="relative z-10 text-neutral-400 group-hover:text-white transition-colors duration-300">
                      {link.icon}
                    </div>
                    <span className="sr-only">{link.label}</span>
                  </a>
                ))}
              </div>
            )}

            {navLinks.length > 0 && (
              <nav className="flex flex-wrap gap-x-8 gap-y-4">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-base text-neutral-400 hover:text-white transition-colors duration-300 relative group"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            ©{new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          {creatorName && creatorUrl && (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <a
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Crafted by {creatorName}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Large background text - FIXED */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[25vw] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-t from-white/[0.03] to-transparent whitespace-nowrap translate-y-[40%]">
          {brandName.toUpperCase()}
        </span>
      </div>

      {/* Bottom logo */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="text-white/[0.02] transform scale-150">
          {brandIcon || (
            <NotepadTextDashed className="w-40 h-40" strokeWidth={0.5} />
          )}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
    </footer>
  );
};
