"use client";

import { useState } from "react";
import { submitContactInquiry } from "@/app/actions/contactInquiryActions";
import type { ContactPageContent } from "@/data/contactPage";
import styles from "./ContactForm.module.css";

type ContactFormProps = {
  form: ContactPageContent["form"];
};

function DoneIcon() {
  return (
    <svg
      className={styles.doneIcon}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 33l8 8 16-18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactForm({ form }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitContactInquiry({
      name,
      email,
      subject,
      message,
    });

    if (result.success) {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      return;
    }

    setStatus("error");
    setErrorMessage(result.message);
  }

  if (status === "success") {
    return (
      <div className={styles.successState} role="status" aria-live="polite">
        <DoneIcon />
        <h2 className={styles.successTitle}>Message sent</h2>
        <p className={styles.successText}>
          Thank you for reaching out. Your message has been received.
        </p>
        <button
          type="button"
          className={styles.sendAnotherBtn}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {form.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={form.namePlaceholder}
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {form.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={form.emailPlaceholder}
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
        <label htmlFor="subject" className={styles.label}>
          {form.subjectLabel}
        </label>
        <select
          id="subject"
          name="subject"
          className={styles.select}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          disabled={status === "submitting"}
        >
          <option value="" disabled>
            Choose one
          </option>
          {form.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className={styles.optionsHint}>{form.subjectHint}</p>
      </div>

      <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
        <label htmlFor="message" className={styles.label}>
          {form.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={form.messagePlaceholder}
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending..." : form.submitText}
      </button>
    </form>
  );
}
