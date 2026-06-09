import styles from './AuthorSection.module.css';

export default function AuthorSection() {
  return (
    <div className={styles.authorSection}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img src="/images/author/darwin-garg.png" alt="Darwin Garg" className={styles.authorImage} />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.title}>Meet the Author</h2>
          <div className={styles.divider}></div>
          <h3 className={styles.name}>Darwin Garg</h3>
          <p className={styles.bio}>
            Darwin Garg is the author of When Gods Must Return: Ancient Wisdom for Modern Chaos — a book that applies the Dashavatar, the ten avatars of Vishnu from Hindu tradition, to ten of the defining crises of our time.
          </p>
          <p className={styles.bio}>
            Darwin was born and raised in Agra, India, in a household steeped in Hindu tradition. His parents introduced him to the sacred texts, stories, and values of their faith from an early age — planting seeds that would quietly grow for decades. The book was not planned. It began with a single question that refused to leave: in a world facing simultaneous crises of information, mental health, climate, authoritarianism, corruption, and moral complexity, what wisdom do we actually have at our disposal? The answer, Darwin discovered, had been sitting in plain sight for thousands of years.
          </p>
          <p className={styles.bio}>
            The Dashavatar — ten avatars, each descending in a specific kind of crisis, each embodying a precise form of wisdom — offered not just individual frameworks but a collective argument: that these ten wisdoms must work together, not one at a time.
          </p>
          <p className={styles.bio}>
            It has taken a lot of time and energy in researching and writing the book. This is his first published work.
          </p>
        </div>
      </div>
    </div>
  );
}
