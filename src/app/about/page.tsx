import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GlobalSiteFooterBar from "@/components/GlobalSiteFooterBar";
import { getAboutPageContent } from "@/lib/aboutPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | Darwin Garg",
  description:
    "From Agra to a writing desk in New Jersey — the story behind the author of When Gods Must Return.",
};

export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 className={styles.title}>{content.hero.title}</h1>
          <p className={styles.subtitle}>{content.hero.subtitle}</p>
        </header>

        <section className={styles.body} aria-label="About the author">
          <div className={styles.portraitFrame}>
            <div className={styles.portrait}>
              <Image
                src={content.intro.portraitImage}
                alt={content.intro.portraitAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className={styles.portraitImage}
              />
            </div>
          </div>

          <div className={styles.prose}>
            {content.intro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </section>

        <section className={styles.story} aria-label="How the book began">
          <p className={styles.storyEyebrow}>{content.story.eyebrow}</p>
          <div className={styles.storyProse}>
            {content.story.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </section>

        <section className={styles.photos} aria-label="In photographs">
          <p className={styles.photosEyebrow}>{content.photos.eyebrow}</p>
          <h2 className={styles.photosTitle}>{content.photos.title}</h2>

          <div className={styles.photoGrid}>
            {content.photos.items.map((photo) => (
              <figure key={photo.src} className={styles.photoCard}>
                <div className={styles.photoBox}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className={styles.photoImage}
                  />
                </div>
                <figcaption className={styles.photoCaption}>
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.beyond} aria-label="Beyond the book">
          <p className={styles.beyondEyebrow}>{content.beyond.eyebrow}</p>
          <div className={styles.beyondProse}>
            {content.beyond.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
          <Link href={content.beyond.buttonHref} className={styles.beyondButton}>
            {content.beyond.buttonText}
          </Link>
        </section>
      </main>

      <footer>
        <GlobalSiteFooterBar />
      </footer>
    </div>
  );
}
