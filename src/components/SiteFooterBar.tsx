import { socialLinks as defaultSocialLinks } from "@/data/social";
import type { SocialLink } from "@/data/homepage";
import styles from "./SiteFooterBar.module.css";

type SiteFooterBarProps = {
  socialLinks?: SocialLink[];
};

export default function SiteFooterBar({
  socialLinks = defaultSocialLinks.map((link) => ({ ...link })),
}: SiteFooterBarProps) {
  const year = new Date().getFullYear();

  return (
    <div className={styles.bar}>
      <p className={styles.copyright}>&copy; Darwin Garg &middot; {year}</p>
      <ul className={styles.links}>
        {socialLinks.map((link, index) => (
          <li key={`${link.label}-${link.href}`} className={styles.linkGroup}>
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
