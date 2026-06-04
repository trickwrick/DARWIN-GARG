import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Journey | Darwin Garg",
  description:
    "From an unwritten thought to a book in readers' hands — the story behind When Gods Must Return.",
};

type JourneyChapter = {
  label: string;
  year: string;
  title: string;
  body: string;
  bodyPlaceholder?: string;
  emphasisWord?: string;
  quote?: string;
  readerQuote?: string;
  imageCaption?: string;
  coverDrafts?: { caption: string }[];
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

const chapters: JourneyChapter[] = [
  {
    label: "Chapter One",
    year: "[Year]",
    title: "The seed of an idea",
    quote:
      "What are you saying? We don't write books. Authors write books.",
    body: `[Placeholder: the moment when the idea of writing first appeared. The conversation with your wife. The early noticing that you had something to say. Two or three paragraphs. End with what made you finally take it seriously.]`,
  },
  {
    label: "Chapter Two",
    year: "[Year]",
    title: "Finding the framework",
    body: `[Placeholder: the structural insight that made the book possible — when the Dashavatar-to-modern-crises mapping clicked into place. Why ten avatars, ten crises. The moment it stopped being a vague idea and became something you could actually write.]`,
  },
  {
    label: "Chapter Three",
    year: "[Year]",
    title: "The writing years",
    body: `[Placeholder: what writing a book while leading a corporate life actually looked like. Early mornings, weekends, the discipline. The chapters that came easily. The ones that didn't.]`,
    imageCaption:
      "Photo placeholder — manuscript, notes, or your writing desk",
  },
  {
    label: "Chapter Four",
    year: "[Year]",
    title: "The discipline of restraint",
    body: "The temptation when you're writing about something this vast — gods, civilizations, modern crises — is to over-explain. The hardest discipline was trusting the stories to do the work. Saying less. Letting an idea land instead of hammering it.",
    bodyPlaceholder:
      "[Placeholder: more on the editing process, what got cut, what got rewritten, the moments of doubt.]",
  },
  {
    label: "Chapter Five",
    year: "[Year]",
    title: "A face for the book",
    body: "[Placeholder: the cover design journey. Drafts, decisions, what you wanted the cover to say without saying it.]",
    coverDrafts: [
      { caption: "Cover draft 1" },
      { caption: "Cover draft 2" },
      { caption: "Final cover" },
    ],
  },
  {
    label: "Chapter Six",
    year: "March 2026",
    title: "Launch day",
    body: "[Placeholder: 25th March 2026. The staggered release — ebook, then KDP print, then IngramSpark. The first sale. The first reader to finish. What that morning felt like.]",
  },
  {
    label: "Chapter Seven",
    year: "The world responds",
    title: "Finding its readers",
    body: "In the weeks after the book went out, readers began to write. Across countries, across ages, across faiths. What I didn't expect was how many would say the same thing — not that they loved the book, but that the book had made them remember they loved reading.",
    emphasisWord: "reading",
    readerQuote:
      "I realized after reading this book that I can read. I love to read. I was just being lazy.",
  },
  {
    label: "Chapter Eight",
    year: "Onward",
    title: "What's next",
    body: "[Placeholder: a short, open-ended close. What you're working on, thinking about, hoping for. Doesn't need to promise a second book — just signal that the road continues.]",
  },
];

export default function JourneyPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>The Journey</p>
          <h1 className={styles.title}>
            From an unwritten thought
            <br />
            to a book in readers&apos; hands
          </h1>
          <p className={styles.subtitle}>
            A book takes a road to find you. This is the one mine took.
          </p>
        </header>

        <section className={styles.chapters} aria-label="Chapters">
          {chapters.map((chapter) => (
            <article key={chapter.label} className={styles.chapter}>
              <div className={styles.chapterGrid}>
                <aside className={styles.chapterMeta}>
                  <p className={styles.chapterLabel}>{chapter.label}</p>
                  <p className={styles.chapterYear}>{chapter.year}</p>
                </aside>

                <div className={styles.chapterContent}>
                  <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                  {chapter.quote && (
                    <p className={styles.chapterQuote}>
                      &ldquo;{chapter.quote}&rdquo;
                    </p>
                  )}
                  <p
                    className={
                      chapter.body.startsWith("[")
                        ? styles.chapterBody
                        : styles.chapterProse
                    }
                  >
                    {chapter.body.startsWith("[")
                      ? chapter.body
                      : renderProse(chapter.body, chapter.emphasisWord)}
                  </p>
                  {chapter.bodyPlaceholder && (
                    <p className={styles.chapterBody}>{chapter.bodyPlaceholder}</p>
                  )}
                  {chapter.readerQuote && (
                    <blockquote className={styles.readerQuote}>
                      <p>&ldquo;{chapter.readerQuote}&rdquo;</p>
                    </blockquote>
                  )}
                  {chapter.imageCaption && (
                    <figure className={styles.chapterFigure}>
                      <div className={styles.chapterPhoto} aria-hidden="true" />
                      <figcaption className={styles.chapterPhotoCaption}>
                        {chapter.imageCaption}
                      </figcaption>
                    </figure>
                  )}
                  {chapter.coverDrafts && (
                    <div className={styles.coverGrid}>
                      {chapter.coverDrafts.map((draft) => (
                        <figure key={draft.caption} className={styles.coverCard}>
                          <div className={styles.coverPhoto} aria-hidden="true" />
                          <figcaption className={styles.coverCaption}>
                            {draft.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.cta} aria-label="Read the book">
          <p className={styles.ctaText}>
            If the journey moved you, perhaps the book will too.
          </p>
          <Link href="/book" className={styles.ctaButton}>
            Read the book &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}
