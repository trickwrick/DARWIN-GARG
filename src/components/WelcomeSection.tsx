import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.quoteSide}>
        <div className={styles.quoteBox}>
          <div className={styles.quoteIcon}>“</div>
          <p className={styles.quoteText}>
            The world isn&apos;t facing one crisis. It&apos;s facing ten — simultaneously.
          </p>
          <div className={styles.quoteDivider}></div>
          <div className={styles.authorInfo}>
            <img src="/images/author/darwin-garg.png" alt="Darwin Garg" className={styles.authorImage} />
            <p className={styles.quoteAuthor}>Darwin Garg</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSide}>
        <h2 className={styles.heading}>
          <span className={styles.ancientText}>ANCIENT WISDOM</span>
          <span className={styles.forText}> FOR </span>
          <span className={styles.modernText}>MODERN CHAOS</span>
        </h2>
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
          <li><strong>Rama</strong> — doing what&apos;s right when it costs everything</li>
          <li><strong>Krishna</strong> — choosing wisely when there are no good options</li>
          <li><strong>Buddha</strong> — breaking free from addiction and endless craving</li>
          <li><strong>Kalki</strong> — transforming systems that create these crises in the first place</li>
        </ul>

        <p>
          Through compelling stories of ordinary people facing extraordinary modern dilemmas, this book shows how timeless avatar wisdom speaks directly to where we are right now — regardless of your religious background or prior knowledge of Hindu tradition.
        </p>

        <p>
          This isn&apos;t a book that picks one solution for one crisis. Its deepest insight is that the crises are interconnected — and so must be the wisdom we bring to them. All ten avatars must return. Not as alternatives, but as one integrated whole.
        </p>

        <div className={styles.actionContainer}>
          <a href="/book" className="btn-primary">
            <span className={styles.playIcon}>▶</span> PRE-ORDER BOOK
          </a>
        </div>
      </div>
    </div>
  );
}
