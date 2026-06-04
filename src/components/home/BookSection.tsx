import Link from "next/link";
import styles from "./BookSection.module.css";

export default function BookSection() {
  return (
    <section id="book" className={styles.section}>
      <hr className={styles.rule} />

      <div className={styles.grid}>
        <div className={styles.cover} aria-hidden>
          Book cover (placeholder)
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>The Book</p>
          <h2 className={styles.title}>When Gods Must Return</h2>
          <p className={styles.subtitle}>Ancient Wisdom for Modern Chaos</p>
          <p className={styles.description}>
            Ten avatars of Vishnu. Ten great crises of our modern world. One book
            that maps them onto each other — not as ten separate lessons, but as
            one system of wisdom our age needs whole.
          </p>
          <Link href="/book" className={styles.moreLink}>
            Read more about the book &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
