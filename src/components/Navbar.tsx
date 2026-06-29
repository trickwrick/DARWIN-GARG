"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/book", label: "The Book" },
  { href: "/journey", label: "The Journey" },
  { href: "/blog", label: "Writings" },
  { href: "/contact", label: "Connect" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
        <Link
          href="/"
          className={styles.logo}
          onClick={() => setIsOpen(false)}
        >
          Darwin Garg
        </Link>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  styles.link,
                  isActive(link.href) && styles.linkActive
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X size={20} strokeWidth={1.25} />
          ) : (
            <Menu size={20} strokeWidth={1.25} />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    styles.mobileLink,
                    isActive(link.href) && styles.linkActive
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      </header>
      <div className={styles.headerSpacer} aria-hidden="true" />
    </>
  );
}
