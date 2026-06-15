import Image from "next/image";
import Link from "next/link";
import { AUTHOR_IMAGE } from "@/data/images";
import type { HomepageContent } from "@/data/homepage";
import styles from "./AboutSection.module.css";

type AboutSectionProps = {
  content: HomepageContent["aboutAuthor"];
};

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className={styles.section}>
      <hr className={styles.rule} />

      <div className={styles.grid}>
        <div className={styles.photoFrame}>
          <div className={styles.photo}>
            <Image
              src={AUTHOR_IMAGE}
              alt="Darwin Garg portrait"
              width={340}
              height={340}
              sizes="170px"
              className={styles.photoImage}
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>

          <p
            className={styles.bio}
            dangerouslySetInnerHTML={{ __html: content.bio }}
          />

          <Link href={content.linkHref} className={styles.moreLink}>
            {content.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
