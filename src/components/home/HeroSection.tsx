import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.portrait} aria-hidden>
          Author portrait (placeholder)
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Author · Strategist · Storyteller</p>

          <h1 className={styles.heading}>Darwin Garg</h1>

          <p className={styles.tagline}>
            I write at the meeting of ancient stories and modern chaos.
          </p>

          <div className={styles.buttons}>
            <Link href="/about" className={styles.btnPrimary}>
              Read my story
            </Link>
            <Link href="/book" className={styles.btnOutline}>
              Discover the book
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
