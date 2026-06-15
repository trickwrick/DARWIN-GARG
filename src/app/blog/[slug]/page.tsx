import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooterBar from "@/components/SiteFooterBar";
import { getEssayBySlug, getAllEssaySlugsFromContent } from "@/lib/writingsPage";
import type { EssayBlock } from "@/data/essays";
import styles from "./page.module.css";

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllEssaySlugsFromContent();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    return { title: "Essay not found" };
  }

  const metaTitle = essay.seo?.metaTitle || `${essay.title} | Darwin Garg`;
  const metaDescription = essay.seo?.metaDescription || essay.dek;
  const keywords = essay.seo?.metaKeywords
    ? essay.seo.metaKeywords.split(",").map((item) => item.trim())
    : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    openGraph: {
      title: essay.seo?.metaTitle || essay.title,
      description: metaDescription,
      type: "article",
    },
  };
}

function EssayBlockRenderer({ block }: { block: EssayBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>;
    case "heading":
      return <h2 className={styles.heading}>{block.text}</h2>;
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>&ldquo;{block.text}&rdquo;</p>
          {block.attribution ? (
            <cite className={styles.quoteAttr}>{block.attribution}</cite>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <Link href="/blog" className={styles.backLink}>
          <span aria-hidden="true">&larr;</span>
          <span>Back to Writings</span>
        </Link>

        <header className={styles.hero}>
          <p className={styles.meta}>
            <span>{essay.category}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>{essay.date}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>{essay.readTime}</span>
          </p>

          <h1 className={styles.title}>{essay.title}</h1>
          <p className={styles.dek}>{essay.dek}</p>

          <p className={styles.byline}>
            <span className={styles.bylineRule} aria-hidden="true" />
            <span>By {essay.author}</span>
            <span className={styles.bylineRule} aria-hidden="true" />
          </p>
        </header>

        <figure className={styles.figure}>
          <div className={styles.figureImage}>
            <Image
              src={essay.image}
              alt={essay.imageAlt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 820px"
              className={styles.photo}
            />
          </div>
          {essay.imageCaption ? (
            <figcaption className={styles.caption}>
              {essay.imageCaption}
            </figcaption>
          ) : null}
        </figure>

        <article className={styles.article}>
          {essay.bodyHtml?.trim() ? (
            <div
              className={styles.richBody}
              dangerouslySetInnerHTML={{ __html: essay.bodyHtml }}
            />
          ) : (
            essay.blocks.map((block, index) => (
              <EssayBlockRenderer key={`${block.type}-${index}`} block={block} />
            ))
          )}
        </article>

        {essay.faqs && essay.faqs.length > 0 ? (
          <section className={styles.faqSection} aria-label="Frequently asked questions">
            <h2 className={styles.faqTitle}>Frequently asked questions</h2>
            <div className={styles.faqList}>
              {essay.faqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.question}</summary>
                  <div
                    className={styles.faqAnswer}
                    dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                  />
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.cta} aria-label="Read the book">
          <p className={styles.ctaLabel}>The book</p>
          <h2 className={styles.ctaTitle}>When Gods Must Return</h2>
          <p className={styles.ctaText}>
            Ten avatars. Ten crises. One map for the age we are living through.
          </p>
          <Link href="/book" className={styles.ctaButton}>
            Discover the book
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>
      </main>

      <footer>
        <SiteFooterBar />
      </footer>
    </div>
  );
}
