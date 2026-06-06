import SiteFooterBar from "@/components/SiteFooterBar";
import RetailerButtons from "@/components/retailers/RetailerButtons";
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
          <RetailerButtons showAllLink />
        </div>
      </div>

      <SiteFooterBar />
    </footer>
  );
}
