"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/actions/authActions";
import { getPendingContactInquiryCountForAdmin } from "@/app/actions/contactInquiryActions";
import { ADMIN_QUERIES_UPDATED_EVENT } from "@/lib/adminQueriesEvents";
import styles from "@/app/admin/admin.module.css";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Homepage", path: "/admin/homepage" },
  { name: "The Book", path: "/admin/book" },
  { name: "The Journey", path: "/admin/journey" },
  { name: "About", path: "/admin/about" },
  { name: "Connect", path: "/admin/connect" },
  { name: "Queries", path: "/admin/queries" },
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
  const [pendingQueryCount, setPendingQueryCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isWritingsSection(pathname)) {
      setWritingsOpen(true);
    }
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    let cancelled = false;

    const loadPendingCount = async () => {
      try {
        const count = await getPendingContactInquiryCountForAdmin();
        if (!cancelled) setPendingQueryCount(count);
      } catch {
        if (!cancelled) setPendingQueryCount(0);
      }
    };

    void loadPendingCount();

    const handleUpdate = () => {
      void loadPendingCount();
    };

    window.addEventListener(ADMIN_QUERIES_UPDATED_EVENT, handleUpdate);
    const intervalId = window.setInterval(loadPendingCount, 30000);

    return () => {
      cancelled = true;
      window.removeEventListener(ADMIN_QUERIES_UPDATED_EVENT, handleUpdate);
      window.clearInterval(intervalId);
    };
  }, [pathname]);

  if (pathname === "/admin/login") {
    return null;
  }

  const writingsSectionActive = isWritingsSection(pathname);

  return (
    <>
      <header className={styles.adminMobileBar}>
        <span className={styles.adminMobileBrand}>Darwin Garg</span>
        <button
          type="button"
          className={styles.adminMobileMenuBtn}
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close admin menu" : "Open admin menu"}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {mobileOpen ? (
        <button
          type="button"
          className={styles.adminOverlay}
          onClick={() => setMobileOpen(false)}
          aria-label="Close admin menu"
        />
      ) : null}

      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}
      >
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
              onClick={() => setMobileOpen(false)}
            >
              <span>{item.name}</span>
              {item.path === "/admin/queries" && pendingQueryCount > 0 ? (
                <span
                  className={styles.navBadge}
                  aria-label={`${pendingQueryCount} pending ${
                    pendingQueryCount === 1 ? "query" : "queries"
                  }`}
                >
                  {pendingQueryCount > 99 ? "99+" : pendingQueryCount}
                </span>
              ) : null}
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
                    onClick={() => setMobileOpen(false)}
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
    </>
  );
}
