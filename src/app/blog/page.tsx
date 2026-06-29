import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import GlobalSiteFooterBar from "@/components/GlobalSiteFooterBar";
import WritingsSection from "@/components/writings/WritingsSection";
import { getWritingsPageContent } from "@/lib/writingsPage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writings | Darwin Garg",
  description:
    "Essays, excerpts, and notes from the margin — pieces that live alongside When Gods Must Return.",
};

export default async function WritingsPage() {
  const content = await getWritingsPageContent();

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
          <h1 className={styles.title}>{content.hero.title}</h1>
          <p className={styles.subtitle}>{content.hero.subtitle}</p>
        </header>

        <WritingsSection content={content} />
      </main>

      <footer>
        <GlobalSiteFooterBar />
      </footer>
    </div>
  );
}
