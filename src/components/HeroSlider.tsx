'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

const slides = [
  {
    id: 1,
    title: "WHEN GODS MUST RETURN",
    subtitle: "Ancient Wisdom for Modern Chaos",
    cta: "PRE-ORDER NOW",
    bgImage: "/images/slider%201.jpeg"
  },
  {
    id: 2,
    title: "TEN CRISES. TEN AVATARS.",
    subtitle: "Discover the alternatives we urgently need.",
    cta: "LEARN MORE",
    bgImage: "/images/slider%202.jpeg"
  },
  {
    id: 3,
    title: "EMBRACE THE JOURNEY",
    subtitle: "Find stability in a world spinning out of control.",
    cta: "READ THE BLOG",
    bgImage: "/images/slider%203.jpeg"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className={styles.overlay}></div>
          <div className={`container ${styles.slideContent}`}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <Link href="/book" className="btn-primary">{slide.cta}</Link>
          </div>
        </div>
      ))}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span 
            key={index} 
            className={`${styles.dot} ${index === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
