"use client";

import { useState } from "react";
import styles from "./WritingsNewsletter.module.css";

export default function WritingsNewsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
  }

  return (
    <section className={styles.newsletter} aria-labelledby="writings-newsletter-heading">
      <p className={styles.eyebrow}>Stay in touch</p>
      <h2 id="writings-newsletter-heading" className={styles.title}>
        Receive new writings by email
      </h2>
      <p className={styles.note}>
        Occasional. Considered. Never more than once a month.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="writings-email" className={styles.srOnly}>
          Email address
        </label>
        <input
          id="writings-email"
          type="email"
          name="email"
          placeholder="your@email.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <button type="submit" className={styles.button}>
          Subscribe
        </button>
      </form>
    </section>
  );
}
