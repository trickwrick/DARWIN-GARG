import Link from "next/link";
import styles from "./JourneySection.module.css";

const chapters = [
  { label: "Level One", title: "The seed of an idea" },
  { label: "Level Two", title: "Finding the framework" },
  { label: "Level Three", title: "The writing years" },
  { label: "Level Four", title: "The discipline of restraint" },
  { label: "Level Five", title: "A face for the book" },
];

export default function JourneySection() {
  return (
    <section id="journey" className={styles.section}>
      <hr className={styles.rule} />

      <header className={styles.header}>
        <p className={styles.eyebrow}>The Making Of</p>
        <h2 className={styles.title}>A book takes a road to find you</h2>
      </header>

      <div className={styles.cards}>
        {chapters.map((chapter) => (
          <article key={chapter.label} className={styles.card}>
            <p className={styles.cardLabel}>{chapter.label}</p>
            <h3 className={styles.cardTitle}>{chapter.title}</h3>
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/journey" className={styles.moreLink}>
          Read the full journey &rarr;
        </Link>
      </div>
    </section>
  );
}
