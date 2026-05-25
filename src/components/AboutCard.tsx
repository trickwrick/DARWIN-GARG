import styles from './AboutCard.module.css';

export default function AboutCard() {
  return (
    <div className={styles.aboutCard}>
      <div className={styles.imageContainer}>
        <img src="/images/real_book_cover.jpg" alt="When Gods Must Return Book Cover" className={styles.image} />
      </div>
      <div className={styles.contentContainer}>
        <h2>ABOUT THE BOOK</h2>
        <div className={styles.divider}></div>
        <p>
          The world isn't facing one crisis. It's facing ten — simultaneously. 
          Misinformation floods every screen. Mental health crises touch nearly every family. 
          The climate emergency accelerates. Authoritarianism rises.
        </p>
        <p>
          Thousands of years ago, Hindu tradition gave us the Dashavatar — ten avatars of Vishnu, 
          each descending to Earth in a moment of crisis, each embodying a distinct form of wisdom 
          the world urgently needed.
        </p>
        <p>
          <strong>When Gods Must Return</strong> brings these ancient forms of wisdom into an urgent 
          conversation with the defining crises of our time.
        </p>
      </div>
    </div>
  );
}
