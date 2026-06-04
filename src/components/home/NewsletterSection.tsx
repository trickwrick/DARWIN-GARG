"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionShell, SectionHeading } from "@/components/home/SectionShell";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <SectionShell
      id="newsletter"
      variant="beige"
      className="border-t border-charcoal/5"
      ariaLabelledBy="newsletter-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn>
          <p className="mb-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.35em] text-bronze">
            Stay Connected
          </p>
          <SectionHeading id="newsletter-heading">
            Join the Journey
          </SectionHeading>
          <p className="mt-5 font-sans text-base leading-relaxed text-charcoal-muted">
            Receive insights on ancient wisdom, new articles, and updates on{" "}
            <em className="font-serif text-charcoal">When Gods Must Return</em>.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-center"
          >
            <div className="flex-1 text-left sm:max-w-md">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit" variant="default" size="lg" className="shrink-0">
              Subscribe
            </Button>
          </form>
          {status === "success" && (
            <p className="mt-6 font-sans text-sm text-bronze" role="status">
              Thank you. You&apos;re on the list.
            </p>
          )}
        </FadeIn>
      </div>
    </SectionShell>
  );
}
