import styles from './TestimonialVideo.module.css';

export default function TestimonialVideo() {
  return (
    <div className={styles.testimonialContainer}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <h2 className={styles.title}>Come and Experience It Yourself</h2>
        <p className={styles.description}>
          Since last 15-20 years of spiritual seeking of my life , I had many questions, met many gurus and paths yet was not satisfied within. I belong to a spiritual family background and found lacked unity in what was learned, taught and implemented in our life. Taking this knowledge I understood whatever happens to you is because of your own fault and the experience could not be put into words but it has to be experienced by all.
        </p>
        <button className={styles.playBtn} aria-label="Play video">
          <span className={styles.playIcon}>▶</span>
        </button>
      </div>
    </div>
  );
}
