import Image from "next/image";
import styles from "./JourneyTimeline.module.css";

export type JourneyChapter = {
  label: string;
  year: string;
  title: string;
  body: string;
  bodyPlaceholder?: string;
  emphasisWord?: string;
  quote?: string;
  readerQuote?: string;
  image?: { src: string; alt: string; caption: string };
  coverDrafts?: readonly { src: string; alt: string; caption: string }[];
};

function renderProse(text: string, emphasisWord?: string) {
  if (!emphasisWord || !text.includes(emphasisWord)) {
    return text;
  }

  const [before, after] = text.split(emphasisWord);
  return (
    <>
      {before}
      <em>{emphasisWord}</em>
      {after}
    </>
  );
}

const PATH_D =
  "M 500 0 C 500 80, 860 80, 860 220 C 860 360, 140 360, 140 520 C 140 680, 860 680, 860 840 C 860 1000, 140 1000, 140 1160 C 140 1320, 860 1320, 860 1480 C 860 1640, 140 1640, 140 1800 C 140 1960, 860 1960, 860 2120 C 860 2280, 500 2280, 500 2400";

type JourneyTimelineProps = {
  chapters: JourneyChapter[];
};

export default function JourneyTimeline({ chapters }: JourneyTimelineProps) {
  return (
    <section className={styles.timeline} aria-label="Chapters">
      <div className={styles.timelineInner}>
        <svg
          className={styles.pathSvg}
          viewBox="0 0 1000 2400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className={styles.pathGlow} d={PATH_D} />
          <path className={styles.pathLine} d={PATH_D} />
        </svg>

        <ol className={styles.milestones}>
          {chapters.map((chapter, index) => {
            const side = index % 2 === 0 ? "right" : "left";

            const anchor = chapter.label.toLowerCase().replace(/\s+/g, "-");

            return (
              <li
                id={anchor}
                key={chapter.label}
                className={`${styles.milestone} ${styles[side]}`}
              >
                <div className={styles.nodeWrap}>
                  <span className={styles.node} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className={styles.connector} aria-hidden="true" />
                </div>

                <article className={styles.card}>
                  <header className={styles.cardHeader}>
                    <p className={styles.cardLabel}>{chapter.label}</p>
                    <span className={styles.cardBadge}>{chapter.year}</span>
                  </header>

                  <h2 className={styles.cardTitle}>{chapter.title}</h2>

                  {chapter.quote && (
                    <p className={styles.cardQuote}>
                      &ldquo;{chapter.quote}&rdquo;
                    </p>
                  )}

                  <p
                    className={
                      chapter.body.startsWith("[")
                        ? styles.cardBody
                        : styles.cardProse
                    }
                  >
                    {chapter.body.startsWith("[")
                      ? chapter.body
                      : renderProse(chapter.body, chapter.emphasisWord)}
                  </p>

                  {chapter.bodyPlaceholder && (
                    <p className={styles.cardBody}>{chapter.bodyPlaceholder}</p>
                  )}

                  {chapter.readerQuote && (
                    <blockquote className={styles.readerQuote}>
                      <p>&ldquo;{chapter.readerQuote}&rdquo;</p>
                    </blockquote>
                  )}

                  {chapter.image && (
                    <figure className={styles.chapterFigure}>
                      <div className={styles.chapterPhoto}>
                        <Image
                          src={chapter.image.src}
                          alt={chapter.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 420px"
                          className={styles.chapterPhotoImage}
                        />
                      </div>
                      <figcaption className={styles.chapterPhotoCaption}>
                        {chapter.image.caption}
                      </figcaption>
                    </figure>
                  )}

                  {chapter.coverDrafts && (
                    <div className={styles.coverGrid}>
                      {chapter.coverDrafts.map((draft) => (
                        <figure key={draft.caption} className={styles.coverCard}>
                          <div className={styles.coverPhoto}>
                            <Image
                              src={draft.src}
                              alt={draft.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 200px"
                              className={styles.coverPhotoImage}
                            />
                          </div>
                          <figcaption className={styles.coverCaption}>
                            {draft.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
