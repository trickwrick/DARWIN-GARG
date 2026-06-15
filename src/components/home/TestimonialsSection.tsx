import type { HomepageContent } from "@/data/homepage";
import styles from "./TestimonialsSection.module.css";

type TestimonialsSectionProps = {
  content: HomepageContent["readerVoices"];
};

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className={styles.section}>
      <hr className={styles.rule} />

      <header className={styles.header}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 className={styles.title}>{content.title}</h2>
      </header>

      <div className={styles.cards}>
        {content.testimonials.map((item) => (
          <blockquote key={`${item.quote}-${item.attribution}`} className={styles.card}>
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
