"use client";

import { useState } from "react";
import type { ContactPageContent } from "@/data/contactPage";
import styles from "./ContactNewsletter.module.css";

type ContactNewsletterProps = {
  content: ContactPageContent["newsletter"];
};

export default function ContactNewsletter({ content }: ContactNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      id="newsletter"
      className={styles.newsletter}
      aria-labelledby="contact-newsletter-heading"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2 id="contact-newsletter-heading" className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.description}>{content.description}</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="contact-newsletter-email" className={styles.srOnly}>
          Email address
        </label>
        <input
          id="contact-newsletter-email"
          type="email"
          className={styles.input}
          placeholder={content.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className={styles.button}>
          {content.buttonText}
        </button>
      </form>

      {status === "success" ? (
        <p className={styles.success} role="status">
          Thank you. You&apos;re on the list.
        </p>
      ) : null}
    </section>
  );
}
