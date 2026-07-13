"use client";

import { useState } from "react";
import styles from "@/app/book/page.module.css";

type FaqItem = {
  question: string;
  answer: string;
};

type BookFaqProps = {
  items: FaqItem[];
};

export default function BookFaq({ items }: BookFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`${styles.faqItem}${isOpen ? ` ${styles.faqItemOpen}` : ""}`}
          >
            <button
              type="button"
              className={styles.faqQuestion}
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span className={styles.faqQuestionText}>{item.question}</span>
              <span className={styles.faqArrow} aria-hidden="true">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className={styles.faqAnswer} role="region">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
