import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            WGMR
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/#about">ABOUT US</Link></li>
          <li><Link href="/contact">CONTACT US</Link></li>
          <li><Link href="/#blog">BLOG</Link></li>
        </ul>
        <div className={styles.actionBtn}>
          <Link href="/book" className="btn-primary">GET THE BOOK</Link>
        </div>
      </div>
    </nav>
  );
}
