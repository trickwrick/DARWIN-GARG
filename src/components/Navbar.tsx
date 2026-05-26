'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            WGMR
          </Link>
        </div>
        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><Link href="/" onClick={() => setIsOpen(false)}>HOME</Link></li>
          <li><Link href="/#about" onClick={() => setIsOpen(false)}>ABOUT US</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>CONTACT US</Link></li>
          <li><Link href="/#blog" onClick={() => setIsOpen(false)}>BLOG</Link></li>
          <li className={styles.mobileOnlyBtn}>
            <Link href="/book" className="btn-primary" onClick={() => setIsOpen(false)}>GET THE BOOK</Link>
          </li>
        </ul>
        <div className={styles.actionBtn}>
          <Link href="/book" className="btn-primary">GET THE BOOK</Link>
        </div>
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={`${styles.bar} ${isOpen ? styles.open1 : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.open2 : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.open3 : ''}`}></span>
        </div>
      </div>
    </nav>
  );
}
