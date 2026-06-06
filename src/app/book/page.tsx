import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BookCover from "@/components/book/BookCover";
import SiteFooterBar from "@/components/SiteFooterBar";
import {
  AMAZON_LINK,
  avatarCrises,
  bookExcerpt,
  bookFaq,
  bookReviews,
} from "@/data/book";
import RetailerButtons from "@/components/retailers/RetailerButtons";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Book | When Gods Must Return",
  description:
    "Ten avatars of Vishnu mapped to ten modern crises. When Gods Must Return by Darwin Garg — ancient wisdom for modern chaos.",
  openGraph: {
    title: "When Gods Must Return | Darwin Garg",
    description:
      "The world isn't facing one crisis. It's facing ten — simultaneously. A debut work of nonfiction.",
    type: "website",
  },
};

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "When Gods Must Return",
  alternateName: "Ancient Wisdom for Modern Chaos",
  author: {
    "@type": "Person",
    name: "Darwin Garg",
  },
  description:
    "Ten avatars of Vishnu mapped to ten defining crises of our time — ancient wisdom for modern chaos.",
  url: "https://darwingarg.com/book",
  offers: {
    "@type": "Offer",
    url: AMAZON_LINK,
    availability: "https://schema.org/InStock",
  },
};

export default function BookPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />

      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero} aria-label="The book">
          <div className={styles.cover}>
            <BookCover />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>A debut work of nonfiction</p>
            <h1 className={styles.title}>When Gods Must Return</h1>
            <p className={styles.tagline}>Ancient Wisdom for Modern Chaos</p>
            <p className={styles.authorByline}>
              By{" "}
              <Link href="/about" className={styles.authorLink}>
                Darwin Garg
              </Link>{" "}
              — from Agra to New Jersey, by way of two decades in the corporate
              world.
            </p>
            <p className={styles.rating} aria-label="5 out of 5 stars from 5 reviews">
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>{" "}
              5.0 · 5 reader reviews
            </p>
            <p className={styles.description}>
              Ten avatars of Vishnu. Ten great crises of our modern world. One
              book that maps them onto each other — not as ten separate lessons,
              but as one system of wisdom our age needs whole.
            </p>

            <div className={styles.actions}>
              <a
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Buy on Amazon
              </a>
              <Link href="#retailers" className={styles.btnOutline}>
                All retailers
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.premise} aria-label="The premise">
          <p className={styles.premiseEyebrow}>The premise</p>
          <h2 className={styles.premiseTitle}>What this book argues</h2>
          <div className={styles.premiseProse}>
            <p>
              We live in an age of converging crises — climate, AI, inequality,
              loneliness, the loss of meaning. We&apos;ve answered them with more
              frameworks, more podcasts, more books of advice. What we&apos;ve
              lost is wisdom.
            </p>
            <p>
              The Dashavatar isn&apos;t ten gods. It&apos;s ten archetypes of how
              to meet chaos — encoded over thousands of years into the stories we
              now treat as just stories. <em>When Gods Must Return</em> argues
              that our age doesn&apos;t need one of these wisdoms. It needs all
              ten, working together.
            </p>
          </div>
        </section>

        <section className={styles.audience} aria-label="Who this book is for">
          <p className={styles.sectionEyebrow}>Who it&apos;s for</p>
          <h2 className={styles.sectionTitle}>Ancient wisdom, modern reader</h2>
          <div className={styles.audienceProse}>
            <p>
              You don&apos;t need a religious background or prior knowledge of
              Hindu tradition. Through stories of ordinary people facing
              extraordinary modern dilemmas, the book shows how timeless avatar
              wisdom speaks directly to where we are right now.
            </p>
            <p>
              Especially for readers of Karen Armstrong, Joseph Campbell, and
              Devdutt Pattanaik — and anyone searching for a framework that
              holds more than one crisis at a time.
            </p>
          </div>
        </section>

        <section className={styles.structure} aria-label="Ten avatars, ten crises">
          <p className={styles.structureEyebrow}>Structure</p>
          <h2 className={styles.structureTitle}>Ten avatars · ten crises</h2>
          <p className={styles.structureIntro}>
            Each avatar embodies a distinct form of wisdom the world urgently
            needed — mapped here to the crisis it speaks to today.
          </p>

          <div className={styles.avatarGrid}>
            {avatarCrises.map((item) => (
              <div key={item.name} className={styles.avatarCard}>
                <p className={styles.avatarName}>{item.name}</p>
                <p className={styles.avatarCrisis}>{item.crisis}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.inside} aria-label="Inside the book">
          <p className={styles.sectionEyebrow}>Inside the book</p>
          <h2 className={styles.sectionTitle}>Stories, not sermons</h2>
          <div className={styles.insideProse}>
            <p>
              A journalist drowning in noise learns what Matsya knew about
              navigation. A parent in burnout finds what Kurma understood about
              bearing weight without breaking. A leader facing impossible choices
              discovers what Krishna meant when there is no clean answer.
            </p>
            <p>
              This isn&apos;t a book that picks one solution for one crisis. Its
              deepest insight is that the crises are interconnected — and so must
              be the wisdom we bring to them.
            </p>
          </div>
        </section>

        <section className={styles.toc} aria-label="Table of contents">
          <p className={styles.sectionEyebrow}>Contents</p>
          <h2 className={styles.sectionTitle}>Ten chapters, one arc</h2>
          <ol className={styles.tocList}>
            {avatarCrises.map((item, index) => (
              <li key={item.name} className={styles.tocItem}>
                <span className={styles.tocNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.tocText}>
                  <p className={styles.tocName}>{item.name}</p>
                  <p className={styles.tocCrisis}>{item.crisis}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.excerpt} aria-label="An excerpt">
          <p className={styles.sectionEyebrow}>An excerpt</p>
          <h2 className={styles.sectionTitle}>Read from the book</h2>

          <blockquote className={styles.liftedCard}>
            {bookExcerpt.map((paragraph) => (
              <p key={paragraph} className={styles.excerptText}>
                {paragraph}
              </p>
            ))}
          </blockquote>

          <Link href="/contact" className={styles.sampleLink}>
            Request a longer sample &rarr;
          </Link>
        </section>

        <section className={styles.reviews} aria-label="Reviews">
          <p className={styles.sectionEyebrow}>Reviews</p>
          <h2 className={styles.sectionTitle}>What readers are saying</h2>

          <div className={styles.reviewsGrid}>
            {bookReviews.map((review) => (
              <blockquote key={review.quote} className={styles.reviewCard}>
                <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                <footer className={styles.reviewAttribution}>
                  &mdash; {review.attribution}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className={styles.faq} aria-label="Frequently asked questions">
          <p className={styles.sectionEyebrow}>Questions</p>
          <h2 className={styles.sectionTitle}>Before you buy</h2>
          <dl className={styles.faqList}>
            {bookFaq.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <dt className={styles.faqQuestion}>{item.question}</dt>
                <dd className={styles.faqAnswer}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.explore} aria-label="Explore further">
          <p className={styles.sectionEyebrow}>Go deeper</p>
          <h2 className={styles.sectionTitle}>The book doesn&apos;t end here</h2>
          <ul className={styles.exploreLinks}>
            <li>
              <Link href="/journey" className={styles.exploreLink}>
                How the book was written &rarr;
              </Link>
            </li>
            <li>
              <Link href="/blog" className={styles.exploreLink}>
                Essays and excerpts &rarr;
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.exploreLink}>
                About the author &rarr;
              </Link>
            </li>
          </ul>
        </section>

        <section className={styles.press} aria-label="Speaking and media">
          <p className={styles.pressText}>
            Book clubs, podcasts, panels, and corporate conversations welcome.
          </p>
          <Link href="/contact" className={styles.pressLink}>
            Invite Darwin to speak &rarr;
          </Link>
        </section>
      </main>

      <section
        id="retailers"
        className={styles.retailers}
        aria-label="Available worldwide"
      >
        <h2 className={styles.retailersTitle}>Available worldwide</h2>
        <p className={styles.retailersFormats}>
          Paperback &middot; Hardcover &middot; Ebook
        </p>

        <RetailerButtons showExtraRetailers className={styles.retailerButtons} />
      </section>

      <footer>
        <SiteFooterBar />
      </footer>
    </div>
  );
}
