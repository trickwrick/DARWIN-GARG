'use client';
import { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the central theme of 'When Gods Must Return'?",
    answer: "The book explores the ancient Hindu concept of the Dashavatar—the ten avatars of Vishnu—and applies their underlying wisdom to ten simultaneous crises facing our modern world."
  },
  {
    question: "Is this a religious book?",
    answer: "No, it's a philosophical and sociological exploration. It uses ancient myths as a framework to understand modern problems like the climate emergency, authoritarianism, and mental health crises."
  },
  {
    question: "Who is the intended audience?",
    answer: "Anyone who feels overwhelmed by the complexity of modern chaos and is looking for a structured, ancient perspective on how to navigate it."
  },
  {
    question: "When will the book be released?",
    answer: "The book is set to release on March 25, 2026. You can pre-order it now via Amazon."
  },
  {
    question: "Is there an audiobook version available?",
    answer: "Yes, an audiobook narrated by the author is in production and will be released shortly after the print edition."
  }
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <div className={styles.divider}></div>
      <div className={styles.accordion}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.item}>
            <button 
              className={`${styles.question} ${activeIndex === index ? styles.active : ''}`} 
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              {faq.question}
              <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`${styles.answer} ${activeIndex === index ? styles.active : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
