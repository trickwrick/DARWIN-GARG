import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooterBar from "@/components/SiteFooterBar";
import WritingsFilters from "@/components/writings/WritingsFilters";
import WritingsNewsletter from "@/components/writings/WritingsNewsletter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writings | Darwin Garg",
  description:
    "Essays, excerpts, and notes from the margin — pieces that live alongside When Gods Must Return.",
};

const writingCards = [
  {
    category: "Excerpt",
    title: "[An excerpt from the book — opening of a chapter]",
    description:
      "[One-line description of which chapter or theme it's drawn from.]",
    href: "#",
  },
  {
    category: "Behind the book",
    title: "[A piece on the making of the book]",
    description:
      "[Why a particular avatar maps to a particular crisis, or a story that didn't make it into the final draft.]",
    href: "#",
  },
  {
    category: "Interview",
    title: "[Author interview or podcast appearance]",
    description:
      "[Where it appeared, a sentence on what was discussed, and a link out.]",
    href: "#",
  },
  {
    category: "Essay",
    title: "[A second essay placeholder]",
    description:
      "[A new reflection on something the book touched on but didn't have room to develop.]",
    href: "#",
  },
];

export default function WritingsPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Writings</p>
          <h1 className={styles.title}>
            Essays, excerpts, and notes from the margin
          </h1>
          <p className={styles.subtitle}>
            Pieces that live alongside the book — some drawn from it, some
            written since.
          </p>
        </header>

        <WritingsFilters />

        <section className={styles.featured} aria-label="Featured essay">
          <div className={styles.featuredContent}>
            <p className={styles.featuredMeta}>
              Featured essay &middot; [Date] &middot; 8 min read
            </p>
            <h2 className={styles.featuredTitle}>
              [Headline placeholder — your first long-form essay]
            </h2>
            <p className={styles.featuredExcerpt}>
              [Two-line excerpt that gives a reader enough flavor to want to
              click in. Aim for an opening sentence that&apos;s a hook, not a
              summary.]
            </p>
            <Link href="#" className={styles.featuredLink}>
              Read the essay &rarr;
            </Link>
          </div>

          <div className={styles.featuredImage} aria-hidden="true">
            <span className={styles.featuredImageLabel}>
              Featured image (placeholder)
            </span>
          </div>
        </section>

        <section className={styles.grid} aria-label="More writings">
          {writingCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <div className={styles.cardImage} aria-hidden="true">
                <span className={styles.cardImageLabel}>Image placeholder</span>
              </div>
              <p className={styles.cardMeta}>
                {card.category} &middot; [Date]
              </p>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDescription}>{card.description}</p>
              <Link href={card.href} className={styles.cardLink}>
                Read &rarr;
              </Link>
            </article>
          ))}
        </section>

        <WritingsNewsletter />
      </main>

      <footer>
        <SiteFooterBar />
      </footer>
    </div>
  );
}
