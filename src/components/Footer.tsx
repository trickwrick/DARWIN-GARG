import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerSection}>
          <h3>WHEN GODS MUST RETURN</h3>
          <p>Ancient Wisdom for Modern Chaos.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/book">The Book</Link></li>
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
