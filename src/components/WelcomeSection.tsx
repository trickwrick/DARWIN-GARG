import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.quoteSide}>
        <div className={styles.quoteBox}>
          <div className={styles.quoteIcon}>“</div>
          <p className={styles.quoteText}>
            The world isn't facing one crisis. It's facing ten — simultaneously.
          </p>
          <div className={styles.quoteDivider}></div>
          <p className={styles.quoteAuthor}>Darwin Garg</p>
        </div>
      </div>
      
      <div className={styles.contentSide}>
        <h2 className={styles.heading}>ANCIENT WISDOM FOR MODERN CHAOS</h2>
        <div className={styles.headingDivider}></div>
        
        <p>
          <strong>When Gods Must Return: Ancient Wisdom for Modern Chaos</strong> brings these ten ancient forms of wisdom into urgent conversation with the defining crises of our time:
        </p>
        
        <ul className={styles.avatarList}>
          <li><strong>Matsya</strong> — navigating the flood of misinformation</li>
          <li><strong>Kurma</strong> — building inner stability in a mental health crisis</li>
          <li><strong>Varaha</strong> — recovering our connection to a dying planet</li>
          <li><strong>Narasimha</strong> — confronting authoritarianism and abuse of power</li>
          <li><strong>Vamana</strong> — humbling the ego that believes it knows best</li>
          <li><strong>Parashurama</strong> — dismantling deep institutional corruption</li>
          <li><strong>Rama</strong> — doing what's right when it costs everything</li>
          <li><strong>Krishna</strong> — choosing wisely when there are no good options</li>
          <li><strong>Buddha</strong> — breaking free from addiction and endless craving</li>
          <li><strong>Kalki</strong> — transforming systems that create these crises in the first place</li>
        </ul>
        
        <p>
          Through compelling stories of ordinary people facing extraordinary modern dilemmas, this book shows how timeless avatar wisdom speaks directly to where we are right now — regardless of your religious background or prior knowledge of Hindu tradition.
        </p>

        <p>
          This isn't a book that picks one solution for one crisis. Its deepest insight is that the crises are interconnected — and so must be the wisdom we bring to them. All ten avatars must return. Not as alternatives, but as one integrated whole.
        </p>
        
        <div className={styles.actionContainer}>
          <a href="/book" className={styles.outlineBtn}>
            <span className={styles.playIcon}>▶</span> PRE-ORDER BOOK
          </a>
        </div>
      </div>
    </div>
  );
}
