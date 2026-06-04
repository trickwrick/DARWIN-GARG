import styles from "./SiteFooterBar.module.css";

export default function SiteFooterBar() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.bar}>
      <p className={styles.copyright}>&copy; Darwin Garg &middot; {year}</p>
      <ul className={styles.links}>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li className={styles.dot} aria-hidden>
          &middot;
        </li>
        <li>
          <a href="#">Facebook</a>
        </li>
        <li className={styles.dot} aria-hidden>
          &middot;
        </li>
        <li>
          <a href="#">LinkedIn</a>
        </li>
        <li className={styles.dot} aria-hidden>
          &middot;
        </li>
        <li>
          <a href="#">Newsletter</a>
        </li>
      </ul>
    </div>
  );
}
