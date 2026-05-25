import styles from './BlogCard.module.css';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogCard({ title, excerpt, date }: BlogCardProps) {
  return (
    <div className={styles.blogCard}>
      <div className={styles.imagePlaceholder}></div>
      <div className={styles.content}>
        <div className={styles.date}>{date}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <button className={styles.readMore}>READ MORE &rarr;</button>
      </div>
    </div>
  );
}
