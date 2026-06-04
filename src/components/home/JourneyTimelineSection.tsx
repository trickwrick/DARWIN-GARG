"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import {
  EditorialLink,
  Eyebrow,
  PageContainer,
  SectionRule,
} from "@/components/home/editorial";

const chapters = [
  { label: "Chapter One", title: "The seed of an idea" },
  { label: "Chapter Two", title: "Finding the framework" },
  { label: "Chapter Three", title: "The writing years" },
  { label: "Chapter Four", title: "The discipline of restraint" },
  { label: "Chapter Five", title: "A face for the book" },
];

export default function JourneyTimelineSection() {
  return (
    <section id="journey" className="bg-cream pb-20 md:pb-28 lg:pb-32">
      <PageContainer>
        <SectionRule className="mb-16 md:mb-20" />

        <FadeIn>
          <div className="text-center">
            <Eyebrow>The Making Of</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight text-charcoal md:text-5xl lg:text-[3.25rem]">
              A book takes a road to find you
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 md:mt-16">
          <div className="flex flex-col divide-y divide-charcoal/10 sm:grid sm:grid-cols-2 sm:divide-y-0 lg:flex lg:flex-row lg:divide-x lg:divide-y-0">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.label}
                className={`py-8 sm:px-6 lg:flex-1 lg:px-8 lg:py-0 ${
                  index % 2 === 1 ? "sm:border-l sm:border-charcoal/10" : ""
                } ${index >= 2 ? "sm:border-t sm:border-charcoal/10 lg:border-t-0" : ""}`}
              >
                <Eyebrow>{chapter.label}</Eyebrow>
                <p className="mt-4 font-serif text-xl leading-snug text-charcoal md:text-[1.35rem]">
                  {chapter.title}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-14 text-center md:mt-16">
          <EditorialLink href="/#about">Read the full journey &rarr;</EditorialLink>
        </FadeIn>
      </PageContainer>
    </section>
  );
}
