import Link from "next/link";
import { getPendingContactInquiryCountForAdmin } from "@/app/actions/contactInquiryActions";
import styles from "./admin.module.css";

const sections = [
  {
    title: "Homepage",
    description: "Hero, book, making of, testimonials, footer",
    href: "/admin/homepage",
  },
  {
    title: "The Book",
    description: "Book page copy, avatars, reviews, FAQ, retailer links",
    href: "/admin/book",
  },
  {
    title: "The Journey",
    description: "Timeline levels, chapter content, images, CTA",
    href: "/admin/journey",
  },
  {
    title: "About",
    description: "Full about page — bio, story, photos, CTA",
    href: "/admin/about",
  },
  {
    title: "Connect",
    description: "Contact page copy, cards, form labels, social links",
    href: "/admin/connect",
  },
  {
    title: "Queries",
    description: "Contact form submissions from the Connect page",
    href: "/admin/queries",
    showPendingBadge: true,
  },
  {
    title: "Writings",
    description: "Blog listings, add/edit posts, categories, tags",
    href: "/admin/writings",
  },
];

export default async function AdminDashboard() {
  const pendingQueryCount = await getPendingContactInquiryCountForAdmin();

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageDescription}>
            Choose a section from the sidebar to start editing site content.
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className={styles.sectionCard}>
            <h2 className={styles.sectionCardTitle}>
              {section.title}
              {section.showPendingBadge && pendingQueryCount > 0 ? (
                <span className={styles.cardBadge}>
                  {pendingQueryCount > 99 ? "99+" : pendingQueryCount}
                </span>
              ) : null}
            </h2>
            <p className={styles.sectionCardText}>{section.description}</p>
            <span className={styles.sectionCardLink}>Open editor &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
