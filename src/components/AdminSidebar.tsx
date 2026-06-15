"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/actions/authActions";
import styles from "@/app/admin/admin.module.css";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Homepage", path: "/admin/homepage" },
  { name: "The Book", path: "/admin/book" },
  { name: "The Journey", path: "/admin/journey" },
];

const writingsSubItems = [
  { name: "All Writings", path: "/admin/writings" },
  { name: "Add New", path: "/admin/writings/new" },
  { name: "Categories", path: "/admin/writings/categories" },
  { name: "Tags", path: "/admin/writings/tags" },
];

function isNavActive(pathname: string, path: string) {
  if (path === "/admin") {
    return pathname === "/admin";
  }
  return pathname.startsWith(path);
}

function isWritingsSection(pathname: string) {
  return pathname.startsWith("/admin/writings");
}

function isWritingsSubActive(pathname: string, path: string) {
  if (path === "/admin/writings") {
    return (
      pathname === "/admin/writings" ||
      /^\/admin\/writings\/[^/]+\/edit$/.test(pathname)
    );
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

function WritingsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const writingsOpenDefault = isWritingsSection(pathname);
  const [writingsOpen, setWritingsOpen] = useState(writingsOpenDefault);

  useEffect(() => {
    if (isWritingsSection(pathname)) {
      setWritingsOpen(true);
    }
  }, [pathname]);

  if (pathname === "/admin/login") {
    return null;
  }

  const writingsSectionActive = isWritingsSection(pathname);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p className={styles.sidebarEyebrow}>Darwin Garg</p>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      </div>
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => {
          const isActive = isNavActive(pathname, item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
            >
              {item.name}
            </Link>
          );
        })}

        <div className={styles.navGroup}>
          <button
            type="button"
            className={`${styles.navGroupToggle} ${
              writingsSectionActive ? styles.navGroupToggleActive : ""
            }`}
            onClick={() => setWritingsOpen((open) => !open)}
            aria-expanded={writingsOpen}
          >
            <span className={styles.navGroupLabel}>
              <WritingsIcon />
              <span>Writings</span>
            </span>
            <span
              className={`${styles.navChevron} ${
                writingsOpen ? styles.navChevronOpen : ""
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

          {writingsOpen ? (
            <div className={styles.navSubmenu}>
              {writingsSubItems.map((item) => {
                const isActive = isWritingsSubActive(pathname, item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${styles.navSubLink} ${
                      isActive ? styles.navSubLinkActive : ""
                    }`}
                  >
                    <span className={styles.navSubDash}>-</span>
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </nav>
      <div className={styles.sidebarFooter}>
        <form action={logoutAdmin}>
          <button type="submit" className={styles.logoutBtn}>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
