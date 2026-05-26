import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerSection}>
          <h3>WHEN GODS MUST RETURN</h3>
          <p style={{ marginTop: '15px', marginBottom: '15px', lineHeight: '1.6', fontSize: '0.9rem' }}>
            When Gods Must Return: Ancient Wisdom for Modern Chaos brings these ten ancient forms of wisdom into urgent conversation with the defining crises of our time.
          </p>
          <p>Ancient Wisdom for Modern Chaos.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/book">The Book</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copy}>
        <p>&copy; {new Date().getFullYear()} Darwin Garg. All rights reserved.</p>
      </div>
    </footer>
  );
}
