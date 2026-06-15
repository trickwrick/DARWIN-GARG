"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type WritingFilter } from "@/data/writings";
import type { WritingsPageContent } from "@/data/writingsPage";
import { writingHref } from "@/data/writingsPage";
import WritingsFilters from "@/components/writings/WritingsFilters";
import WritingsNewsletter from "@/components/writings/WritingsNewsletter";
import styles from "@/app/blog/page.module.css";

type WritingsSectionProps = {
  content: WritingsPageContent;
};

export default function WritingsSection({ content }: WritingsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<WritingFilter>("All");

  const showFeatured =
    activeFilter === "All" || activeFilter === content.featured.category;

  const filteredWritings = useMemo(() => {
    if (activeFilter === "All") return content.writings;
    return content.writings.filter((item) => item.category === activeFilter);
  }, [activeFilter, content.writings]);

  return (
    <>
      <WritingsFilters active={activeFilter} onChange={setActiveFilter} />

      {showFeatured ? (
        <section className={styles.featured} aria-label="Featured essay">
          <div className={styles.featuredContent}>
            <p className={styles.featuredMeta}>
              <span>Featured essay</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{content.featured.date}</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{content.featured.readTime}</span>
            </p>
            <h2 className={styles.featuredTitle}>{content.featured.title}</h2>
            <p className={styles.featuredExcerpt}>{content.featured.excerpt}</p>
            <Link
              href={writingHref(content.featured.slug)}
              className={styles.featuredLink}
            >
              <span>{content.featured.linkText}</span>
              <span className={styles.linkArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>

          <Link
            href={writingHref(content.featured.slug)}
            className={styles.featuredImageLink}
            aria-label={`Read featured essay: ${content.featured.title}`}
          >
            <div className={styles.featuredImage}>
              <Image
                src={content.featured.image}
                alt={content.featured.imageAlt}
                width={480}
                height={640}
                sizes="(max-width: 768px) 100vw, 320px"
                className={styles.featuredPhoto}
              />
              <span className={styles.imageOverlay} aria-hidden="true" />
            </div>
          </Link>
        </section>
      ) : null}

      {filteredWritings.length > 0 ? (
        <section className={styles.grid} aria-label="More writings">
          {filteredWritings.map((card) => (
            <article key={card.id} className={styles.card}>
              <Link href={writingHref(card.slug)} className={styles.cardLinkWrap}>
                <div className={styles.cardImage}>
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={styles.cardPhoto}
                  />
                  <span className={styles.imageOverlay} aria-hidden="true" />
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{card.category}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{card.date}</span>
                  </p>
                  <h2 className={styles.cardTitle}>{card.title}</h2>
                  <p className={styles.cardDescription}>{card.description}</p>
                  <span className={styles.cardCta}>
                    Read
                    <span className={styles.linkArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <p className={styles.emptyState}>{content.emptyState}</p>
      )}

      <WritingsNewsletter content={content.newsletter} />
    </>
  );
}
