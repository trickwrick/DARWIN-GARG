"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  SectionShell,
  SectionHeading,
  SectionLabel,
} from "@/components/home/SectionShell";
import { cn } from "@/lib/utils";

export interface BlogItem {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

const fallbackArticles: BlogItem[] = [
  {
    _id: "fallback-1",
    title: "The Return of the Dashavatar",
    excerpt:
      "Why ancient forms of wisdom are more relevant today than ever before.",
    date: "March 15, 2026",
    image:
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "fallback-2",
    title: "Navigating Modern Chaos",
    excerpt:
      "Using ancient archetypes to find stability in a world spinning out of control.",
    date: "February 28, 2026",
    image:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "fallback-3",
    title: "Author Interview: Darwin Garg",
    excerpt:
      "The inspiration behind the book and connecting ten avatars with ten global crises.",
    date: "January 10, 2026",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
  },
];

interface LatestArticlesSectionProps {
  blogs: BlogItem[];
}

export default function LatestArticlesSection({
  blogs,
}: LatestArticlesSectionProps) {
  const articles = blogs.length > 0 ? blogs.slice(0, 3) : fallbackArticles;
  const usingFallback = blogs.length === 0;

  return (
    <SectionShell id="blog" variant="cream" ariaLabelledBy="blog-heading">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <FadeIn>
          <SectionLabel>Journal</SectionLabel>
          <SectionHeading id="blog-heading">Latest Insights</SectionHeading>
          <p className="mt-4 max-w-xl font-sans text-base text-charcoal-muted">
            Thoughts, articles, and deep dives into ancient wisdom applied to
            the present moment.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:mt-16">
        {articles.map((article, index) => (
          <FadeIn key={article._id} delay={index * 0.1}>
            <ArticleCard article={article} href={usingFallback ? "/blog" : "/blog"} />
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-12 text-center md:hidden">
        <Button asChild variant="outline">
          <Link href="/blog">View All Articles</Link>
        </Button>
      </FadeIn>
    </SectionShell>
  );
}

function ArticleCard({ article, href }: { article: BlogItem; href: string }) {
  return (
    <Card className="group h-full overflow-hidden border-charcoal/8 p-0 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(44,36,25,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-beige">
        {article.image ? (
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-beige-dark" />
        )}
      </div>
      <CardContent className="flex flex-col p-8">
        <time className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-bronze">
          {article.date}
        </time>
        <h3 className="mt-3 font-serif text-xl font-medium leading-snug text-charcoal">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-charcoal-muted">
          {article.excerpt}
        </p>
        <Link
          href={href}
          className={cn(
            "mt-6 inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-bronze"
          )}
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
