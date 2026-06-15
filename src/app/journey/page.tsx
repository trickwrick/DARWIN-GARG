import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import JourneyTimeline from "@/components/journey/JourneyTimeline";
import { getJourneyPageContent } from "@/lib/journeyPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Journey | Darwin Garg",
  description:
    "From an unwritten thought to a book in readers' hands — the story behind When Gods Must Return.",
};

export default async function JourneyPage() {
  const content = await getJourneyPageContent();

  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 className={styles.title}>
            {content.hero.titleLine1}
            <br />
            {content.hero.titleLine2}
          </h1>
          <p className={styles.subtitle}>{content.hero.subtitle}</p>
        </header>

        <JourneyTimeline chapters={content.chapters} />

        <section className={styles.cta} aria-label="Read the book">
          <p className={styles.ctaText}>{content.cta.text}</p>
          <Link href={content.cta.buttonHref} className={styles.ctaButton}>
            {content.cta.buttonText}
          </Link>
        </section>
      </main>
    </div>
  );
}
