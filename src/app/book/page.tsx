import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BookCover from "@/components/book/BookCover";
import GlobalSiteFooterBar from "@/components/GlobalSiteFooterBar";
import { AVATAR_IMAGES } from "@/data/images";
import { getBookPageContent } from "@/lib/bookPage";
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

function renderParagraphs(paragraphs: string[], className: string) {
  return paragraphs.map((paragraph) => (
    <p
      key={paragraph}
      className={className}
      dangerouslySetInnerHTML={{ __html: paragraph }}
    />
  ));
}

function getAvatarImage(name: string) {
  return (
    AVATAR_IMAGES[name as keyof typeof AVATAR_IMAGES] ?? AVATAR_IMAGES.Matsya
  );
}

export default async function BookPage() {
  const content = await getBookPageContent();

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: content.hero.title,
    alternateName: content.hero.tagline,
    author: {
      "@type": "Person",
      name: content.hero.authorName,
    },
    description: content.hero.description,
    url: "https://darwingarg.com/book",
    offers: {
      "@type": "Offer",
      url: content.hero.amazonLink,
      availability: "https://schema.org/InStock",
    },
  };

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
            <div className={styles.coverFrame}>
              <BookCover />
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
            <h1 className={styles.title}>{content.hero.title}</h1>
            <p className={styles.tagline}>{content.hero.tagline}</p>
            <p className={styles.authorByline}>
              By{" "}
              <Link href={content.hero.authorLink} className={styles.authorLink}>
                {content.hero.authorName}
              </Link>{" "}
              {content.hero.authorSuffix}
            </p>
            <p
              className={styles.rating}
              aria-label="5 out of 5 stars from 5 reviews"
            >
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>{" "}
              {content.hero.ratingText}
            </p>
            <p className={styles.description}>{content.hero.description}</p>

            <div className={styles.actions}>
              <a
                href={content.hero.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                {content.hero.primaryButtonText}
              </a>
              <Link
                href={content.hero.secondaryButtonHref}
                className={styles.btnOutline}
              >
                {content.hero.secondaryButtonText}
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.premise} aria-label="The premise">
          <p className={styles.premiseEyebrow}>{content.premise.eyebrow}</p>
          <h2 className={styles.premiseTitle}>{content.premise.title}</h2>
          <div className={styles.premiseProse}>
            {renderParagraphs(content.premise.paragraphs, "")}
          </div>
        </section>

        <section className={styles.audience} aria-label="Who this book is for">
          <p className={styles.sectionEyebrow}>{content.audience.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.audience.title}</h2>
          <div className={styles.audienceProse}>
            {renderParagraphs(content.audience.paragraphs, "")}
          </div>
        </section>

        <section className={styles.structure} aria-label="Ten avatars, ten crises">
          <p className={styles.structureEyebrow}>{content.structure.eyebrow}</p>
          <h2 className={styles.structureTitle}>{content.structure.title}</h2>
          <p className={styles.structureIntro}>{content.structure.intro}</p>

          <div className={styles.avatarGrid}>
            {content.structure.avatars.map((item) => (
              <div key={item.name} className={styles.avatarCard}>
                <div className={styles.avatarImageWrap}>
                  <Image
                    src={getAvatarImage(item.name)}
                    alt={`${item.name} avatar illustration`}
                    fill
                    sizes="(max-width: 640px) 50vw, 180px"
                    className={styles.avatarImage}
                  />
                </div>
                <p className={styles.avatarName}>{item.name}</p>
                <p className={styles.avatarCrisis}>{item.crisis}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.inside} aria-label="Inside the book">
          <p className={styles.sectionEyebrow}>{content.inside.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.inside.title}</h2>
          <div className={styles.insideProse}>
            {renderParagraphs(content.inside.paragraphs, "")}
          </div>
        </section>

        <section className={styles.excerpt} aria-label="An excerpt">
          <p className={styles.sectionEyebrow}>{content.excerpt.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.excerpt.title}</h2>

          <blockquote className={styles.liftedCard}>
            {content.excerpt.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.excerptText}>
                {paragraph}
              </p>
            ))}
          </blockquote>

          <Link href={content.excerpt.linkHref} className={styles.sampleLink}>
            {content.excerpt.linkText}
          </Link>
        </section>

        <section className={styles.reviews} aria-label="Reviews">
          <p className={styles.sectionEyebrow}>{content.reviews.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.reviews.title}</h2>

          <div className={styles.reviewsGrid}>
            {content.reviews.items.map((review) => (
              <blockquote
                key={`${review.quote}-${review.attribution}`}
                className={styles.reviewCard}
              >
                <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                <footer className={styles.reviewAttribution}>
                  &mdash; {review.attribution}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className={styles.faq} aria-label="Frequently asked questions">
          <p className={styles.sectionEyebrow}>{content.faq.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.faq.title}</h2>
          <div className={styles.faqList}>
            {content.faq.items.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <div className={styles.faqAnswer}>{item.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.explore} aria-label="Explore further">
          <p className={styles.sectionEyebrow}>{content.explore.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{content.explore.title}</h2>
          <ul className={styles.exploreLinks}>
            {content.explore.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.exploreLink}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.press} aria-label="Speaking and media">
          <p className={styles.pressText}>{content.press.text}</p>
          <Link href={content.press.linkHref} className={styles.pressLink}>
            {content.press.linkText}
          </Link>
        </section>
      </main>

      <section
        id="retailers"
        className={styles.retailers}
        aria-label="Available worldwide"
      >
        <h2 className={styles.retailersTitle}>{content.retailers.title}</h2>
        <p className={styles.retailersFormats}>{content.retailers.formats}</p>

        <RetailerButtons
          showExtraRetailers
          className={styles.retailerButtons}
          stores={content.retailers.stores}
          extra={content.retailers.extra}
        />
      </section>

      <footer>
        <GlobalSiteFooterBar />
      </footer>
    </div>
  );
}
