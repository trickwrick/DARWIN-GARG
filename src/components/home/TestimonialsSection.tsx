import { bookReviews } from "@/data/book";
import styles from "./TestimonialsSection.module.css";

const testimonials = bookReviews.slice(0, 2);

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className={styles.section}>
      <hr className={styles.rule} />

      <header className={styles.header}>
        <p className={styles.eyebrow}>Reader Voices</p>
        <h2 className={styles.title}>What readers are saying</h2>
      </header>

      <div className={styles.cards}>
        {testimonials.map((item) => (
          <blockquote key={item.quote} className={styles.card}>
            <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
            <cite className={styles.attribution}>
              &mdash; {item.attribution}
            </cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
