"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  featuredWriting,
  writings,
  type WritingFilter,
} from "@/data/writings";
import WritingsFilters from "@/components/writings/WritingsFilters";
import WritingsNewsletter from "@/components/writings/WritingsNewsletter";
import styles from "@/app/blog/page.module.css";

export default function WritingsSection() {
  const [activeFilter, setActiveFilter] = useState<WritingFilter>("All");

  const showFeatured =
    activeFilter === "All" || activeFilter === featuredWriting.category;

  const filteredWritings = useMemo(() => {
    if (activeFilter === "All") return writings;
    return writings.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <WritingsFilters active={activeFilter} onChange={setActiveFilter} />

      {showFeatured ? (
        <section className={styles.featured} aria-label="Featured essay">
          <div className={styles.featuredContent}>
            <p className={styles.featuredMeta}>
              <span>Featured essay</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{featuredWriting.date}</span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span>{featuredWriting.readTime}</span>
            </p>
            <h2 className={styles.featuredTitle}>{featuredWriting.title}</h2>
            <p className={styles.featuredExcerpt}>{featuredWriting.excerpt}</p>
            <Link href={featuredWriting.href} className={styles.featuredLink}>
              <span>Read the essay</span>
              <span className={styles.linkArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>

          <Link
            href={featuredWriting.href}
            className={styles.featuredImageLink}
            aria-label={`Read featured essay: ${featuredWriting.title}`}
          >
            <div className={styles.featuredImage}>
              <Image
                src={featuredWriting.image}
                alt={featuredWriting.imageAlt}
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
              <Link href={card.href} className={styles.cardLinkWrap}>
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
        <p className={styles.emptyState}>
          More pieces in this category are on the way.
        </p>
      )}

      <WritingsNewsletter />
    </>
  );
}
