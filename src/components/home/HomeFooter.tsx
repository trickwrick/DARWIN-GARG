import SiteFooterBar from "@/components/SiteFooterBar";
import RetailerButtons from "@/components/retailers/RetailerButtons";
import { getHomepageContent } from "@/lib/homepage";
import type { HomepageContent } from "@/data/homepage";
import styles from "./HomeFooter.module.css";

type HomeFooterProps = {
  content?: HomepageContent["footer"];
  socialLinks?: HomepageContent["socialLinks"];
};

export default async function HomeFooter({
  content,
  socialLinks,
}: HomeFooterProps = {}) {
  const homepage = await getHomepageContent();
  const footerContent = content ?? homepage.footer;
  const footerLinks = socialLinks ?? homepage.socialLinks;

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <p className={styles.message}>{footerContent.message}</p>

        <div className={styles.buttons}>
          <RetailerButtons showAllLink />
        </div>
      </div>

      <SiteFooterBar socialLinks={footerLinks} />
    </footer>
  );
}
