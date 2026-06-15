import Image from "next/image";
import Link from "next/link";
import type { HomepageContent } from "@/data/homepage";
import styles from "./HeroSection.module.css";

type HeroSectionProps = {
  content: HomepageContent["author"];
};

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.portrait}>
          <div className={styles.portraitFrame}>
            <Image
              src={content.portraitImage}
              alt={content.portraitAlt}
              width={510}
              height={680}
              priority
              sizes="(max-width: 768px) 220px, 255px"
              className={styles.portraitImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>

          <h1 className={styles.heading}>{content.heading}</h1>

          <p className={styles.tagline}>{content.tagline}</p>

          <div className={styles.buttons}>
            <Link href={content.primaryButtonHref} className={styles.btnPrimary}>
              {content.primaryButtonText}
            </Link>
            <Link href={content.secondaryButtonHref} className={styles.btnOutline}>
              {content.secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
