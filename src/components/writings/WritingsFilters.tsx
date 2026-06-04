"use client";

import { useState } from "react";
import styles from "./WritingsFilters.module.css";

const categories = [
  "All",
  "Essays",
  "Excerpts",
  "Behind the book",
  "Interviews",
] as const;

type Category = (typeof categories)[number];

export default function WritingsFilters() {
  const [active, setActive] = useState<Category>("All");

  return (
    <nav className={styles.filters} aria-label="Filter writings by category">
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                active === category ? styles.filterActive : styles.filter
              }
              onClick={() => setActive(category)}
              aria-current={active === category ? "true" : undefined}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
