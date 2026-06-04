import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/home/HomeFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connect | Darwin Garg",
  description:
    "Get in touch with Darwin Garg — readers, speaking, media, and more.",
};

const contactCards = [
  {
    title: "Readers",
    description:
      "Thoughts on the book, questions, or a passage that stayed with you.",
  },
  {
    title: "Speaking & events",
    description:
      "Talks, panels, book clubs, podcasts, and corporate conversations.",
  },
  {
    title: "Media & interviews",
    description:
      "Reviews, features, interviews. Press kit available on request.",
  },
];

const socialLinks = [
  { name: "Instagram", handle: "@WhenGodsMustReturn", href: "#" },
  { name: "Facebook", handle: "/WhenGodsMustReturn", href: "#" },
  { name: "LinkedIn", handle: "Darwin Garg", href: "#" },
  { name: "Goodreads", handle: "Author profile", href: "#" },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Connect</p>
          <h1 className={styles.title}>
            I&apos;m always glad to hear from readers
          </h1>
          <p className={styles.subtitle}>
            If the book reached you in some way — or if you&apos;d like to invite
            me to speak or write — write to me below.
          </p>
        </header>

        <div className={styles.cards}>
          {contactCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardText}>{card.description}</p>
            </article>
          ))}
        </div>

        <section className={styles.formSection} aria-label="Send a message">
          <form className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="First and last name"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label htmlFor="subject" className={styles.label}>
                What&apos;s this about?
              </label>
              <select
                id="subject"
                name="subject"
                className={styles.select}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option value="reader">A reader message</option>
                <option value="speaking">Speaking inquiry</option>
                <option value="media">Media inquiry</option>
                <option value="other">Something else</option>
              </select>
              <p className={styles.optionsHint}>
                Options: A reader message · Speaking inquiry · Media inquiry ·
                Something else
              </p>
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label htmlFor="message" className={styles.label}>
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write as much or as little as you like."
                className={styles.textarea}
                required
              />
            </div>

            <button type="submit" className={styles.submit}>
              Send message
            </button>
          </form>
        </section>

        <section className={styles.elsewhere} aria-labelledby="elsewhere-heading">
          <header className={styles.elsewhereHeader}>
            <p className={styles.elsewhereEyebrow}>Elsewhere</p>
            <h2 id="elsewhere-heading" className={styles.elsewhereTitle}>
              Find me across the web
            </h2>
          </header>

          <div className={styles.socialGrid}>
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={styles.socialCard}
                target={item.href !== "#" ? "_blank" : undefined}
                rel={item.href !== "#" ? "noopener noreferrer" : undefined}
              >
                <p className={styles.socialName}>{item.name}</p>
                <p className={styles.socialHandle}>{item.handle}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
