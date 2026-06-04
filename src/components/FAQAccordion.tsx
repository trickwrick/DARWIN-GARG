'use client';
import { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
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
