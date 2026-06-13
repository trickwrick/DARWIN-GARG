import Link from "next/link";
import styles from "@/app/admin/admin.module.css";

type AdminPageShellProps = {
  title: string;
  description: string;
  publicHref: string;
  publicLabel: string;
};

export default function AdminPageShell({
  title,
  description,
  publicHref,
  publicLabel,
}: AdminPageShellProps) {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{title}</h1>
          <p className={styles.pageDescription}>{description}</p>
        </div>
        <Link href={publicHref} className={styles.viewSiteBtn} target="_blank">
          {publicLabel} &rarr;
        </Link>
      </div>

      <div className={styles.placeholderCard}>
        <p className={styles.placeholderEyebrow}>Coming next</p>
        <h2 className={styles.placeholderTitle}>Content editor for this section</h2>
        <p className={styles.placeholderText}>
          This area is ready in the admin panel. Tell me what fields you want to
          edit here and we will wire them up step by step.
        </p>
      </div>
    </div>
  );
}
