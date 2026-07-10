"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WritingsPageContent } from "@/data/writingsPage";
import { deleteWritingPost } from "@/app/actions/writingsPostActions";
import styles from "@/app/admin/admin.module.css";

type WritingsListingsProps = {
  content: WritingsPageContent;
};

type ListingRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  date: string;
  isFeatured: boolean;
  status: "ACTIVE" | "INACTIVE";
};

function buildListingRows(content: WritingsPageContent): ListingRow[] {
  const rows: ListingRow[] = [];
  const featuredSlug = content.featured.slug;

  const statusForSlug = (slug: string) =>
    content.essays.find((essay) => essay.slug === slug)?.status ?? "ACTIVE";

  rows.push({
    id: "featured",
    slug: featuredSlug,
    title: content.featured.title,
    category: content.featured.category,
    image: content.featured.image,
    imageAlt: content.featured.imageAlt,
    date: content.featured.date,
    isFeatured: true,
    status: statusForSlug(featuredSlug),
  });

  for (const writing of content.writings) {
    if (writing.slug === featuredSlug) continue;

    rows.push({
      id: writing.id,
      slug: writing.slug,
      title: writing.title,
      category: writing.category,
      image: writing.image,
      imageAlt: writing.imageAlt,
      date: writing.date,
      isFeatured: false,
      status: writing.status ?? statusForSlug(writing.slug),
    });
  }

  return rows;
}

function PencilIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function WritingsListings({ content }: WritingsListingsProps) {
  const rows = buildListingRows(content);
  const [isPending, startTransition] = useTransition();

  function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteWritingPost(slug);
      if (!result.success) {
        alert(result.message ?? "Failed to delete.");
      }
    });
  }

  return (
    <div>
      <div className={styles.listingsTopBar}>
        <h1 className={styles.listingsPageTitle}>Manage Writings</h1>
        <p className={styles.listingsBreadcrumb}>
          <span>Writings</span>
          <span className={styles.listingsBreadcrumbSep}>&gt;</span>
          <span className={styles.listingsBreadcrumbCurrent}>
            Writings Listings
          </span>
        </p>
      </div>

      <div className={styles.listingsCard}>
        <div className={styles.listingsCardHeader}>
          <h2 className={styles.listingsCardTitle}>Writings Listings</h2>
          <Link href="/admin/writings/new" className={styles.listingsAddBtn}>
            + Add New
          </Link>
        </div>

        <div className={styles.listingsTableWrap}>
          <table className={styles.listingsTable}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Image</th>
                <th>Blog Name</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className={styles.listingsCellNum}>{index + 1}</td>
                  <td>
                    <div className={styles.listingsThumb}>
                      {row.image ? (
                        <Image
                          src={row.image}
                          alt={row.imageAlt || row.title}
                          width={48}
                          height={48}
                          className={styles.listingsThumbImg}
                        />
                      ) : (
                        <span className={styles.listingsThumbPlaceholder} />
                      )}
                    </div>
                  </td>
                  <td className={styles.listingsCellTitle}>{row.title}</td>
                  <td>{row.category}</td>
                  <td>
                    <span
                      className={`${styles.listingsStar} ${
                        row.isFeatured ? styles.listingsStarActive : ""
                      }`}
                      title={row.isFeatured ? "Featured" : "Not featured"}
                    >
                      <StarIcon filled={row.isFeatured} />
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        row.status === "ACTIVE"
                          ? styles.listingsStatusActive
                          : styles.listingsStatusInactive
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className={styles.listingsCellDate}>{row.date}</td>
                  <td>
                    <div className={styles.listingsActionGroup}>
                      <Link
                        href={`/admin/writings/${row.slug}/edit`}
                        className={styles.listingsEditBtn}
                        aria-label={`Edit ${row.title}`}
                        title="Edit"
                      >
                        <PencilIcon />
                      </Link>
                      <button
                        className={styles.listingsDeleteBtn}
                        aria-label={`Delete ${row.title}`}
                        title="Delete"
                        type="button"
                        disabled={isPending}
                        onClick={() => handleDelete(row.slug, row.title)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
