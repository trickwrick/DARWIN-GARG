"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import {
  EditorialLink,
  Eyebrow,
  PageContainer,
  RectPlaceholder,
  SectionRule,
} from "@/components/home/editorial";

export default function FeaturedBookSection() {
  return (
    <section id="book" className="bg-cream pb-20 md:pb-28 lg:pb-32">
      <PageContainer>
        <SectionRule className="mb-16 md:mb-20" />

        <FadeIn>
          <div className="text-center">
            <Eyebrow>The Book</Eyebrow>
            <h2 className="mt-4 font-headline text-4xl font-medium tracking-tight text-charcoal md:text-5xl lg:text-[3.25rem]">
              When Gods Must Return
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-charcoal/75 md:text-xl">
              A journey through the labyrinth of time.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14 grid grid-cols-1 items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-20 xl:gap-28">
          <RectPlaceholder className="mx-auto aspect-[2/3] w-full max-w-[220px] lg:mx-0 lg:max-w-none" />

          <div className="max-w-xl lg:pt-4">
            <p className="font-serif text-[1.05rem] leading-[1.85] text-charcoal/90 md:text-lg">
              The essence of Vishnu&apos;s Dashavatar is not mythology alone — it
              is a map for our age. Ten crises, ten forms of wisdom, each
              arriving when the world needs it most.{" "}
              <em>When Gods Must Return</em> brings these ancient stories into
              urgent conversation with misinformation, mental health, climate,
              power, and the moral complexity of modern life.
            </p>
            <p className="mt-6 font-serif text-[1.05rem] leading-[1.85] text-charcoal/90 md:text-lg">
              Through ordinary people facing extraordinary dilemmas, the book
              shows how timeless avatar wisdom speaks directly to where we are
              right now.
            </p>
            <div className="mt-8">
              <EditorialLink href="/book">
                Read more about the book &rarr;
              </EditorialLink>
            </div>
          </div>
        </FadeIn>
      </PageContainer>
    </section>
  );
}
