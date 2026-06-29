import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import GlobalSiteFooterBar from "@/components/GlobalSiteFooterBar";
import ContactNewsletter from "@/components/contact/ContactNewsletter";
import ContactForm from "@/components/contact/ContactForm";
import { getContactPageContent } from "@/lib/contactPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connect | Darwin Garg",
  description:
    "Get in touch with Darwin Garg — readers, speaking, media, and more.",
};

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 className={styles.title}>{content.hero.title}</h1>
          <p className={styles.subtitle}>{content.hero.subtitle}</p>
        </header>

        <div className={styles.cards}>
          {content.cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardText}>{card.description}</p>
            </article>
          ))}
        </div>

        <section className={styles.formSection} aria-label="Send a message">
          <ContactForm form={content.form} />
        </section>

        <section className={styles.elsewhere} aria-labelledby="elsewhere-heading">
          <header className={styles.elsewhereHeader}>
            <p className={styles.elsewhereEyebrow}>{content.elsewhere.eyebrow}</p>
            <h2 id="elsewhere-heading" className={styles.elsewhereTitle}>
              {content.elsewhere.title}
            </h2>
          </header>

          <div className={styles.socialGrid}>
            {content.socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.socialCard}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={styles.socialName}>{item.label}</p>
                <p className={styles.socialHandle}>{item.handle}</p>
              </a>
            ))}
          </div>
        </section>

        <ContactNewsletter content={content.newsletter} />
      </main>

      <GlobalSiteFooterBar />
    </div>
  );
}
