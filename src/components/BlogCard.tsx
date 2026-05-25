import styles from './BlogCard.module.css';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

export default function BlogCard({ title, excerpt, date, image }: BlogCardProps) {
  return (
    <div className={styles.blogCard}>
      {image ? (
        <img className={styles.blogImage} src={image} alt={title} />
      ) : (
        <div className={styles.imagePlaceholder}></div>
      )}
      <div className={styles.content}>
        <div className={styles.date}>{date}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <button className={styles.readMore}>READ MORE &rarr;</button>
      </div>
    </div>
  );
}
