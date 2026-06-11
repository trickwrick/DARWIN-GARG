import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooterBar from "@/components/SiteFooterBar";
import { AUTHOR_IMAGE, aboutPhotos } from "@/data/images";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | Darwin Garg",
  description:
    "From Agra to a writing desk in New Jersey — the story behind the author of When Gods Must Return.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.title}>A road, and a book</h1>
          <p className={styles.subtitle}>
            From Agra to a writing desk in New Jersey, by way of two decades in
            the corporate world.
          </p>
        </header>

        <section className={styles.body} aria-label="About the author">
          <div className={styles.portraitFrame}>
            <div className={styles.portrait}>
              <Image
                src={AUTHOR_IMAGE}
                alt="Darwin Garg portrait"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className={styles.portraitImage}
              />
            </div>
          </div>

          <div className={styles.prose}>
            <p>
              I was born and raised in Agra, went to Kanpur for my engineering,
              and moved to Noida for work. For the last twenty years, I&apos;ve
              lived inside the corporate world — business leadership, strategy,
              the language of markets and quarterly goals.
            </p>
            <p>
              But somewhere alongside that, I&apos;ve always been drawn to the
              older language: myths, scriptures, the stories my parents told me as
              if they were just stories. <em>When Gods Must Return</em> came from
              the collision of those two worlds — the boardroom and the Bhagavata.
            </p>
            <p>
              These days, I live with my family in New Jersey, and I&apos;m finding
              that being an author and being a corporate leader ask surprisingly
              similar things of us: clarity, conviction, and the patience to let
              an idea find its people.
            </p>
          </div>
        </section>

        <section className={styles.story} aria-label="How the book began">
          <p className={styles.storyEyebrow}>How the book began</p>
          <div className={styles.storyProse}>
            <p>
              I never thought I&apos;d be an author. When my wife once suggested
              I write a book, my reaction was — &ldquo;What are you saying? We
              don&apos;t write books. Authors write books.&rdquo;
            </p>
            <p>
              Then I started noticing something at gatherings with friends.
              Whenever our ancient history came up, I&apos;d look up after
              fifteen or twenty minutes and realize I was the only one talking.
              Everyone else was just listening.
            </p>
            <p>
              It made me think that maybe I knew things others didn&apos;t —
              things they&apos;d actually want to know. The book felt like the
              most honest way to share them.
            </p>
          </div>
        </section>

        <section className={styles.photos} aria-label="In photographs">
          <p className={styles.photosEyebrow}>In photographs</p>
          <h2 className={styles.photosTitle}>A few moments along the way</h2>

          <div className={styles.photoGrid}>
            {aboutPhotos.map((photo) => (
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
          <p className={styles.beyondEyebrow}>Beyond the book</p>
          <div className={styles.beyondProse}>
            <p>
              When I&apos;m not writing or working, I&apos;m usually [placeholder
              for personal interests — reading, walking, family, anything that
              makes you human on the page].
            </p>
            <p>
              I&apos;m always glad to hear from readers. If the book reached you
              in some way, write to me.
            </p>
          </div>
          <Link href="/contact" className={styles.beyondButton}>
            Get in touch
          </Link>
        </section>
      </main>

      <footer>
        <SiteFooterBar />
      </footer>
    </div>
  );
}
