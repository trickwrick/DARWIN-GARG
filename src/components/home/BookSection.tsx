import Image from "next/image";
import Link from "next/link";
import type { HomepageContent } from "@/data/homepage";
import styles from "./BookSection.module.css";

type BookSectionProps = {
  content: HomepageContent["book"];
};

export default function BookSection({ content }: BookSectionProps) {
  return (
    <section id="book" className={styles.section}>
      <hr className={styles.rule} />

      <div className={styles.grid}>
        <div className={styles.cover}>
          <div className={styles.coverFrame}>
            <Image
              src={content.coverImage}
              alt={content.coverAlt}
              width={400}
              height={600}
              sizes="(max-width: 768px) 220px, 255px"
              className={styles.coverImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title}>{content.title}</h2>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <p className={styles.description}>{content.description}</p>
          <Link href={content.linkHref} className={styles.moreLink}>
            {content.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
