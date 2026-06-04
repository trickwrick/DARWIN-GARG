import Link from "next/link";
import SiteFooterBar from "@/components/SiteFooterBar";
import { AMAZON_LINK } from "@/data/book";
import styles from "./HomeFooter.module.css";

export default function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <p className={styles.message}>
          If you&apos;ve made it this far, thank you. The book is out in the
          world now, finding its readers across countries and conversations.
        </p>

        <div className={styles.buttons}>
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Amazon
          </a>
          <a href="#" className={styles.btnOutline}>
            Barnes &amp; Noble
          </a>
          <a href="#" className={styles.btnOutline}>
            Flipkart
          </a>
          <Link href="/book" className={styles.btnOutline}>
            All retailers &rarr;
          </Link>
        </div>
      </div>

      <SiteFooterBar />
    </footer>
  );
}
