import Link from "next/link";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <hr className={styles.rule} />

      <div className={styles.grid}>
        <div className={styles.photo} aria-hidden>
          Photo (placeholder)
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>About the Author</p>

          <p className={styles.bio}>
            Born in Agra, schooled in Kanpur, shaped by two decades in the
            corporate world — and somewhere along the way, drawn back to the
            older stories. <em>When Gods Must Return</em> is what came from that
            collision.
          </p>

          <Link href="/about" className={styles.moreLink}>
            Read more about me &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
