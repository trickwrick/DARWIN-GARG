import Link from 'next/link';
import styles from './admin.module.css';

const sections = [
  {
    title: 'Homepage',
    description: 'Hero, book section, journey levels, about, testimonials',
    href: '/admin/homepage',
  },
  {
    title: 'The Book',
    description: 'Book page copy, avatars, reviews, FAQ, retailers',
    href: '/admin/book',
  },
  {
    title: 'The Journey',
    description: 'Timeline levels, chapter content, images, CTA',
    href: '/admin/journey',
  },
  {
    title: 'Writings',
    description: 'Featured essay, writings list, essay pages',
    href: '/admin/writings',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageDescription}>
            Choose a section from the sidebar to start editing site content.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className={styles.sectionCard}>
            <h2 className={styles.sectionCardTitle}>{section.title}</h2>
            <p className={styles.sectionCardText}>{section.description}</p>
            <span className={styles.sectionCardLink}>Open editor &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
