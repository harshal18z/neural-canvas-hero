'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, SparklesIcon } from 'lucide-react';

type PricingCardProps = {
  titleBadge: string;
  priceLabel: string;
  priceSuffix?: string;
  features: string[];
  cta?: string;
  className?: string;
};

function FilledCheck() {
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-white/10">
      <CheckIcon className="size-3 text-white" strokeWidth={3} />
    </span>
  );
}

function PricingCard({
  titleBadge,
  priceLabel,
  priceSuffix = '/month',
  features,
  cta = 'Subscribe',
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5">
          {titleBadge}
        </Badge>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          {cta}
        </Button>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-white">
          {priceLabel}
        </span>
        {priceLabel.toLowerCase() !== 'free' && (
          <span className="text-white/50">{priceSuffix}</span>
        )}
      </div>

      <ul className="flex flex-col gap-2 text-sm text-white/70">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <FilledCheck />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BentoPricing() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {/* Featured Card - Spans 3 columns */}
      <div className="relative col-span-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm md:col-span-2 lg:col-span-3">
        <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent blur-3xl" />

        <div className="relative z-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white">
              <SparklesIcon className="size-4" />
              CREATORS SPECIAL
            </span>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
              <SparklesIcon className="mr-1 size-3" /> Most Recommended
            </Badge>
          </div>

          <Button
            size="lg"
            className="mb-8 bg-white text-black hover:bg-white/90"
          >
            Subscribe
          </Button>

          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-white">
                $19
              </span>
              <span className="text-white/50">/month</span>
            </div>

            <ul className="grid gap-2 text-sm text-white/80 md:grid-cols-2">
              {[
                'Perfect for individual bloggers',
                'Freelancers and entrepreneurs',
                'AI-Powered editing tools',
                'Basic Analytics to track content performance',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FilledCheck />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Basic Plan */}
      <PricingCard
        titleBadge="STARTER"
        priceLabel="Free"
        features={['5 projects', 'Basic analytics', 'Community support']}
        className="lg:col-span-1"
      />

      {/* Pro Plan */}
      <PricingCard
        titleBadge="PRO"
        priceLabel="$49"
        features={['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations']}
        className="lg:col-span-1"
      />

      {/* Enterprise Plan */}
      <PricingCard
        titleBadge="ENTERPRISE"
        priceLabel="$99"
        features={['Everything in Pro', 'Dedicated support', 'SLA guarantee']}
        className="md:col-span-2 lg:col-span-2"
      />

      {/* Team Plan */}
      <PricingCard
        titleBadge="TEAM"
        priceLabel="$29"
        priceSuffix="/user/month"
        features={['Team collaboration', 'Shared workspaces', 'Role management']}
        className="lg:col-span-1"
      />
    </div>
  );
}
