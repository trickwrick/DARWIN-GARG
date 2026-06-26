import Link from "next/link";
import type { HomepageContent } from "@/data/homepage";
import styles from "./JourneySection.module.css";

type JourneySectionProps = {
  content: HomepageContent["makingOf"];
};

export default function JourneySection({ content }: JourneySectionProps) {
  return (
    <section id="journey" className={styles.section}>
      <hr className={styles.rule} />

      <header className={styles.header}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.title}>{content.title}</h2>
      </header>

      <div className={styles.cards}>
        {content.chapters.map((chapter) => (
          <article key={chapter.label} className={styles.card}>
            <p className={styles.cardLabel}>{chapter.label}</p>
            <h3 className={styles.cardTitle}>{chapter.title}</h3>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href={content.linkHref} className={styles.moreLink}>
          {content.linkText} &rarr;
        </Link>
      </div>
    </section>
  );
}
