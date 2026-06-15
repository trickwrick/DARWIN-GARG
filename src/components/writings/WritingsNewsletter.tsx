"use client";

import { useState } from "react";
import type { WritingsPageContent } from "@/data/writingsPage";
import styles from "./WritingsNewsletter.module.css";

type WritingsNewsletterProps = {
  content: WritingsPageContent["newsletter"];
};

export default function WritingsNewsletter({ content }: WritingsNewsletterProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
  }

  return (
    <section className={styles.newsletter} aria-labelledby="writings-newsletter-heading">
      <p className={styles.eyebrow}>{content.eyebrow}</p>
      <h2 id="writings-newsletter-heading" className={styles.title}>
        {content.title}
      </h2>
      <p className={styles.note}>{content.note}</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="writings-email" className={styles.srOnly}>
          Email address
        </label>
        <input
          id="writings-email"
          type="email"
          name="email"
          placeholder={content.placeholder}
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className={styles.button}>
          {content.buttonText}
        </button>
      </form>
    </section>
  );
}
