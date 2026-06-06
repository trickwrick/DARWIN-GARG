import { socialLinks } from "@/data/social";
import styles from "./SiteFooterBar.module.css";

export default function SiteFooterBar() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.bar}>
      <p className={styles.copyright}>&copy; Darwin Garg &middot; {year}</p>
      <ul className={styles.links}>
        {socialLinks.map((link, index) => (
          <li key={link.label} className={styles.linkGroup}>
            {index > 0 ? (
              <span className={styles.dot} aria-hidden>
                &middot;
              </span>
            ) : null}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
        <li className={styles.linkGroup}>
          <span className={styles.dot} aria-hidden>
            &middot;
          </span>
          <a href="/#newsletter">Newsletter</a>
        </li>
      </ul>
    </div>
  );
}
